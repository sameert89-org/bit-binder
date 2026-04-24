This is pretty simple we need to run a traversal from each node we see unvisited that is our total number of connnected components.

This can be also solved using [[Disjoint Set Union(DSU)]] we can keep doing union and then at the end check which unique parents are present.

Below is a DSU based solution in C++

```cpp
class DSU {
private:
    int n;
    vector<int> parent;
    vector<int> rank;
public:
    DSU(int n) {
        this->n = n;
        parent.resize(n);
        rank.resize(n);
        iota(parent.begin(), parent.end(), 0);
    }

    int find(int u) {
        if(parent[u] == u)
            return u;
        parent[u] = find(parent[u]); // path compression
        return parent[u];
    }

    void unite(int u, int v) {
        // union by rank
        int parU = find(u);
        int parV = find(v);

        if(parU != parV) {
            if(rank[parU] >= rank[parV]) {
                parent[parV] = parU;
                rank[parU]++;
            }
            else {
                parent[parU] = parV;
                rank[parV]++;
            }
        }
    }
};

class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        DSU dsu(n);
        const int E = edges.size();
        for(int i = 0; i < E; i++) {
            int u = edges[i][0], v = edges[i][1];

            dsu.unite(u,v);
        }
        unordered_set<int> parents;

        for(int i = 0; i < n; i++) {
            parents.insert(dsu.find(i));
        }

        return parents.size();
    }
};
```