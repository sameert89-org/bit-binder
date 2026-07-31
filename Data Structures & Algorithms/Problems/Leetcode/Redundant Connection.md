#needcode150 #graphs #MST 

We can find a cycle using any way, bfs, dfs, DSU etc. but this problem asks for a specific thing that if we have multiple edges that we can remove we need to give the last edge based on appearance in the edges array. This gives a clean inclination towards minimum spanning tree where although we are not provided weight but we have a sort of *pseudo weight* as the index of the edge in edges array.

Since MST construction goes from smallest edges first the first edge we find in this order which does not belong in the MST would be our answer, below is a clean Kruskal's MST algo implementation to solve this problem

```cpp
class DSU {
private:
    int n;
    vector<int> rank, parent;
public:
    DSU(int n) : n(n) {
        rank.resize(n);
        parent.resize(n);
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int u) {
        if(parent[u] == u)
            return u;
        return parent[u] = find(parent[u]);
    }
    bool unite(int u, int v) {
        u = find(u);
        v = find(v);

        if(u != v) {
            if(rank[u] >= rank[v]) {
                parent[v] = u;
                rank[u]++;
            } else {
                parent[u] = v;
                rank[v]++;
            }
            return true; 
        }
        return false;
    }
};
class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        const int E = edges.size();
        DSU dsu(E + 1);
        for(int i = 0; i < E; i++) {
            int u = edges[i][0], v = edges[i][1];

            if(!dsu.unite(u, v))
                return {u, v};
        }
        return {-1, -1};
    }
};
```