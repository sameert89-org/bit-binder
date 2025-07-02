This is another kind of graph traversal, in this traversal all the neighbors of a vertex are visited at once before moving on to their neighbors.
It uses queue data structure to achieve this order.
It is one of the most important algorithms in graphs, in my experience even more so than DFS. It follows a **minimum order**. Means it can be used to find shortest distance between nodes.
It is the same as **lever order traversal** of trees.
<mark style="background: #ABF7F7A6;">Time complexity of BFS: O(V) space complexity O(V)</mark>

![[Drawing 2023-08-21 22.26.37.excalidraw]]

Below is the implementation of the iterative version of BFS.

#### BFS
```python
def bfs(adj, vertex, vis):
    q = deque()
    q.append(vertex)
    vis.add(vertex)
    while q:
        node = q.popleft()
        for neighbor in adj[node]:
             if neighbor not in vis:
                vis.add(neighbor)
                q.append(neighbor)
```
```cpp
void bfs(unordered_map<int, vector<int>> &adj, int vertex, unordered_set<int>& vis){
    queue<int> q;
    q.push(vertex);
    vis.insert(vertex);
    while(!q.empty()){
        int node = q.front();
        q.pop();
        for(auto const &neighbor: adj[node]){
            if(!vis.count(neighbor)){
                q.push(neighbor);
                vis.insert(neighbor);
            }
        }
    }
}
```

#### implicit BFS

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
def bfs_impl(matrix, vertex, vis):
    vis.add(vertex)
    q = deque()
    q.append(vertex)
    while q:
	    x, y = q.popleft()
	    for r, c in valid_neighbors(x, y, matrix):
	        if (r, c) not in vis:
	            q.append((r, c))
	            vis.add((r, c))

```

```cpp
vector<pair<int, int>> valid_neighbors(int x, int y, vector<vector<int>> &graph){
    vector<pair<int, int>> neighbors, delta{{{0,-1}, {-1, 0}, {0, 1}, {1, 0}}};
    int m = graph.size(), n = graph[0].size();
    for(auto const &[dx, dy]: delta){
        int r = x + dx, c = y + dy;
        if(r >=0 and r < m and c >= 0 and c < n) neighbors.push_back({r,c});
    }
    return neighbors;
}
void BFS(vector<vector<int>> &matrix, int vertex, vector<vector<bool>> vis)
```

### Multi Source BFS
This is also one of the most frequent topics in the graph theory. It is a variation of implicit BFS In this algorithm we take more than one sources and the BFS progresses simultaneously for those source vertices.
Below Diagram shows the thing visually

![[Drawing 2023-08-25 14.07.54.excalidraw]]

The template below is for multi source BFS.
[[level order traversal]] of <mark style="background: #ABF7F7A6;">binary trees</mark> without the null method
```python
def bfs_multi(matrix, vis):
    q = deque()
    m, n = len(matrix), len(matrix[0])
    for r in range(m):
        for c in range(n):
            if matrix[r][c] == 1:
                q.append((r, c))
                vis.add((r, c))
    while q:
        sz = len(q) # This part is closely related to level wise traversal of trees
        while sz:
            sz -= 1
            x, y = q.popleft()
            for r, c in valid_neighbors(x, y, matrix):
                if (r, c) not in vis:
                    vis.add((r, c))
                    q.append((r, c))
```