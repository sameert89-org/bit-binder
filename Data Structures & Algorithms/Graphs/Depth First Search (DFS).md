This is a traversal technique of graphs, which goes depth-wise. It will go from a node to one of its neighbors and then go into one of the neighbors' neighbors and then backtracks when it cant go deeper.

![[Drawing 2023-08-21 11.32.44.excalidraw]]

It utilizes stack for the order of nodes. The recursive implementation is the most common as it is way shorter than both BFSes and the iterative DFS.
<mark style="background: #ABF7F7A6;">Time and Space Complexity: O(V) each node is visited only once and the recursion stack takes space for each step.</mark>
#### DFS
```python
# Snippet created by sameer 21-08-2023
def dfs(adj, vertex, vis):
    vis.add(vertex)
    for neighbor in adj[vertex]:
        if not vis[neighbor]:
            dfs(adj, neighbor, vis)
```

```cpp
// Snippet created by sameer 21-08-2023
void dfs(const unordered_map<int, vector<int>>& adj, int vertex, unordered_set<int>& vis) {
    vis.insert(vertex);
    for (int neighbor : adj[vertex]) {
        if (vis.find(neighbor) == vis.end()) {
            dfs(adj, neighbor, vis);
        }
    }
}
```

#### Implicit DFS

```python
# Snippet created by sameer 21-08-2023
def valid_neighbors(x, y, graph):
    m, n = len(graph), len(graph[0])
    delta = [(-1,0),(0,-1),(0,1),(1,0)]
    neighbors = []
    for dx,dy in delta:
        r, c = x + dx, y + dy
        if 0<=r<m and 0<=c<n:
            neighbors.append((r,c))
    return neighbors
def dfs_impl(matrix, vertex, vis):
    x, y = vertex
    vis.add(vertex)
    for r, c in valid_neighbors(x, y, matrix):
        if (r, c) not in vis:
            dfs_impl(matrix, (r, c), vis)
```

```cpp
// Snippet created by sameer 21-08-2023
vector<pair<int, int>> valid_neighbors(int x, int y, vector<vector<int>> &graph){
    vector<pair<int, int>> neighbors, delta{{{0,-1}, {-1, 0}, {0, 1}, {1, 0}}};
    int m = graph.size(), n = graph[0].size();
    for(auto const &[dx, dy]: delta){
        int r = x + dx, c = y + dy;
        if(r >=0 and r < m and c >= 0 and c < n) neighbors.push_back({r,c});
    }
    return neighbors;
}
void dfs_impl(vector<vector<int>> &matrix, pair<int, int> vertex, vector<vector<int>> vis){
	auto [x, y] = vertex;
	vis[x][y] = true;
	for(auto [r, c]: valid_neighbors(x, y, matrix)){
		if(!vis[r][c]) dfs_impl(matrix, {r, c}, vis);
	}
}
```

#### Iterative DFS
```python
def dfs_iter(adj, vertex, vis):
	stack = []
	stack.append(vertex)
	vis.add(vertex)
	while stack:
		node = stack.pop()
		for neighbor in adj[node]:
			if neighbor not in vis:
				vis.add(neighbor)
				stack.append(neighbor)
```