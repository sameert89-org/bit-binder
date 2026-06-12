# Binary Lifting
#dp
Binary Lifting solves a specific problem: _there is a tree of size `N` rooted at 0._
_Answer Q queries:_
_given v and k, find the kth ancestor of v;_

A naive solution to this problem would be doing this:
repeat k times: `v = parent[v]`
And for a single query you cannot do better than `O(E)` in the worst case.
Hence for Q queries it would be `O(QE)`

After doing binary lifting each queries can be answered in `O(QlogE)`

## Core Idea
Any number k can be represented as *sum of powers of 2*. This is true for any number.

For example I want the 100th ancestor.

`100 = 64 + 32 + 4` This can be visualized as:

current_node -> jump to 64th ancestor -> jump to 32nd ancestor -> jump to 4th ancestor

This is logarithmic. So if for each node I can store the `log(N)` ancestors which are powers of 2, I can answer any query in logarithmic time.

For each node we will precompute its ancestor above it, its ancestor two nodes above, its ancestor four above, etc. 

The recurrence relation is:
`lift[u][i]=lift[lift[u][i-1]][i-1]`

the 2^ith ancestor of u is 2^i-1 th ancestor of 2^i-1 ancestor of u

2^4 or 16th ancestor = 8th ancestor of 8th ancestor (8 + 8 = 16)

```cpp
class BinaryLift {
private:
    vector<vector<int>> lift;
    vector<int> depth;
    int N;
    int LOG;

    void dfs(int node, int par, const unordered_map<int, vector<int>>& adj) {
        lift[node][0] = par;
        depth[node] = (par == -1 ? 0 : depth[par] + 1);

        for (int j = 1; j < LOG; j++) {
            if (lift[node][j - 1] == -1) {
                lift[node][j] = -1;
            } else {
                lift[node][j] = lift[lift[node][j - 1]][j - 1];
            }
        }

        auto it = adj.find(node);
        if (it == adj.end()) return;

        for (const int nbr : it->second) {
            if (nbr != par) {
                dfs(nbr, node, adj);
            }
        }
    }

public:
    BinaryLift(int n, const unordered_map<int, vector<int>>& adj) : N(n) {
        LOG = 1;
        while ((1 << LOG) <= N) {
            LOG++;
        }

        depth.assign(N + 1, 0);
        lift.assign(N + 1, vector<int>(LOG, -1));

        dfs(1, -1, adj); // root at 1
    }

    int findKthAncestor(int node, int k) {
        for (int j = 0; j < LOG; j++) {
            if (k & (1 << j)) {
                node = lift[node][j];

                if (node == -1) {
                    return -1;
                }
            }
        }

        return node;
    }
    
    int lca(int u, int v) {
	    if(depth[u] < depth[v])
		    swap(u, v);
		// lift the deeper node to make them at same height
		u = findKthAncestor(u, depth[u] - depth[v]);
		
		if(u == v) 
			return u;
		
		// Lift both together
		for(int j = LOG - 1; j >= 0; j--) {
			if(lift[u][j] != lift[v][j]) {
				u = lift[u][j];
				v = lift[v][j];
			}
		}
		
		// both are just below the LCA
		return lift[u][0];
    }
};
```

This can be used to find LCA as well.

For 2 nodes, lift the deeper node by its extra height and lift both nodes afterwards by remaining height.