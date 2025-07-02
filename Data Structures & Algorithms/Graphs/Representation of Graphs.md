Representation of graphs is done in a number of ways
# Adjacency Matrix
One way of representing a graph with V vertices is using a `V*V` matrix. Whenever there is an edge between two vertices u and v then `Adj[u][v] != 0`. The rest stuff is zero where there are no edges. It can represent all types of graphs weighted unweighted, cyclic etc. 

**Demerit:** Wastage of space because when there is no edge but still we are consuming memory to store the zero.

![[Pasted image 20230821102028.png]]
# Adjacency List
This is the most commonly used and most efficient one to represent graphs. We make a map of the vertex $u$ to a list that has all the nodes $v_i$ such that there exists an edge between u and $v_i$.

![[Pasted image 20230821102417.png]]

To represent a weighted graph we can just use a pair/tuple of (node/weight) in the list.

### Building Adjacency List From edge-list
Below are the code snippets.
#### build graph
```cpp
template <typename Container>
unordered_map<int, vector<int>> build_graph(const Container &edges, bool directed = false)
{
    unordered_map<int, vector<int>> adj;
    for (const auto &edge : edges)
    {
        int u, v;
        if constexpr (std::is_same_v<Container, vector<vector<int>>>)
        {
            u = edge[0];
            v = edge[1];
        }
        else if constexpr (std::is_same_v<Container, vector<pair<int, int>>>)
        {
            u = edge.first;
            v = edge.second;
        }
        adj[u].push_back(v);
        if (!directed)
            adj[v].push_back(u);
    }
    return adj;
}
```

```python
def build_graph(edges, directed):
    adj = defaultdict(list)
    weighted = len(edges[0]) == 3
    for edge in edges:
	    if weighted:
		    u,v,w = edge
		    adj[u].append(v, w)
		    if not directed: adj[v].append(u, w)
		else:
			u,v = edge
			adj[u].append(v)
			if not directed: adj[v].append(u)
    return adj
```

Note: The python code works for weighted graphs too.
# Edge list
This is one more way of representing graphs, basically it is a list of tuples where each tuple represents an edge between u and v or from u to v in case of directed graphs. some times there are weights associated too.

# Implicit Graph
In this form the graph is implied. A lot of problems are formed using this method. You are given a matrix which has some zeroes and ones, you need to do DFS or BFS on them. The neighbors of the cell are 4 connected or 8 connected. generally 4 connected you need to find the neighbors of the cells and then apply traversal. Below is the snippet for the valid neighbors.

#### valid neighbors

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
```

```python
def valid_neighbors(x, y, graph):
    m, n = len(graph), len(graph[0])
    delta = [(-1,0),(0,-1),(0,1),(1,0)]
    neighbors = []
    for dx,dy in delta:
        r, c = x + dx, y + dy
        if 0<=r<m and 0<=c<n:
            neighbors.append((r,c))
    return neighbors
```