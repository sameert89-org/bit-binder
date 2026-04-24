#needcode150 #graphs 

This is a classic cycle detection in a graph problem, a tree a graph where there are no cycles. This can be done by tracking parents while traversals.

Basically during traversal you are bound to come across a situation where an already visited index shows up, normally you'd ignore this with the help of a visited set. But in this case you need to check where this is originating from.

By that we mean that if *we see a neighbor that is already visited who is not our parent then that means there is a cycle*

One other conditon to check is there should be one connected component, a disjoint graph is not a valid tree.

![[Graph Valid Tree 2026-04-24 15.46.50.excalidraw]]

Below is a C++ implementation of the idea:

```cpp
class Solution {
   public:
    bool dfs(int i, int par, const vector<vector<int>>& adjList, vector<bool>& vis) {
        vis[i] = true;
        bool res = true;
        for (auto nbr : adjList[i]) {
            if (!vis[nbr])
                res &= dfs(nbr, i, adjList, vis);
            else if (par != nbr) {
                res = false;
                break;
            }
        }
        return res;
    }
    bool validTree(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adjList(n);
        const int E = edges.size();

        for (int i = 0; i < E; i++) {
            int u = edges[i][0], v = edges[i][1];
            adjList[u].push_back(v);
            adjList[v].push_back(u);
        }
        vector<bool> vis(n);

        return dfs(0, -1, adjList, vis) and
               all_of(vis.begin(), vis.end(), [](int v) { return v == true; });
    }
};
```

