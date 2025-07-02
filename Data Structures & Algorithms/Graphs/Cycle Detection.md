Read [[Graphs]] to know more about **cycles**. Below are the variants of this problem.
# Cycle detection in Undirected graphs

Cycle detection in undirected graphs follows one simple logic **you get a free pass if you are my parent**. Means when I am revisiting the vertex I have visited earlier, I can only continue if it is my parent or halt. Be it [[Breadth First Search (BFS)]] or [[Depth First Search (DFS)]] in both of the algorithms you have to keep track of the parent of the current node.

### Using BFS
Below is the code snippet which is self-explanatory.
<mark style="background: #ABF7F7A6;">Note: You will have to run the code for each connected component with a loop if it's not visited.</mark>

```python
def undir_cycle_bfs(adj, vertex, vis):
    parent = {vertex: -1}
    q = deque()
    q.append(vertex)
    vis.add(vertex)
    while q:
        curr = q.popleft()
	    for nbr in adj[curr]:
	        if nbr not in vis:
	                vis.add(nbr)
	                parent[nbr] = curr
	                q.append(nbr)
	        elif nbr != parent[curr]: return True # cycle is present
    return False
```
Note: do not get confused by why we are setting the parent of the source node as -1. Because it's visited first so we have to do all operations there itself and as long as the vertexes are positive, it works always even for self edges *dry run*.
```cpp
bool undir_cycle_bfs(vector<vector<int>> &adj, int vertex, unordered_set<int> &vis){
	unordered_map<int, int> parent({vertex, -1});
	queue<int> q;
	q.append(vertex);
	vis.insert(vertex);
	while(!q.empty()){
		int curr = q.pop();
		for(auto const &nbr: adj[curr]){
			if(vis.count(nbr) == 0){
				vis.insert(nbr);
				parent[nbr] = curr;
				q.push(nbr);
			} else if (nbr != parent[curr]): return true;
		}
	}
	return false;
}
```

### Using DFS
The approach is similar again, here also we keep track of the parent vertex for each vertex.
<mark style="background: #ABF7F7A6;">Before the call starts in the driver you have to manually set the parent of source to -1.</mark>

```python
def undir_cycle_dfs(adj, vertex, vis, parent):
	vis.add(vertex)
	for nbr in adj[vertex]:
		if nbr not in vis:
			parent[nbr] = vertex
			if undir_cycle_dfs(adj, nbr, vis, parent): return True
		elif nbr != parent[vertex]: return True
	return False
```

```cpp
bool undir_cycle_dfs(vector<vector<int>> &adj, unordered_set<int> &vis, unordered_map<int, int> &parent){
	vis.insert(vertex);
	for(auto const &nbr: adj[vertex]){
		if(vis.count(nbr) == 0){
			parent[nbr] = vertex;
			if(undir_cycle_dfs(adj, nbr, vis, parent)) return true;
		} else if(nbr != parent[vertex]) return true;
	}
	return false;
}
```

## Cycle detection in directed graphs

So our parent logic will fail here, see the below diagram

![[Drawing 2023-08-25 17.54.00.excalidraw]]

**BFS failing**: In this case if we start from the vertex `s` BFS will first visit `a` and `b` then when is the turn of a, a sees that b is already visited but it is not my parent so a call will return true. But infact there is no cycle here.
**DFS failing**: In this case if we start from the vertex `s` DFS will first visit a, then visit b from a's call. Then returns. Then continues in the adj of s for the next branch. It sees that b is already visited but it is not the parent of curr vertex `s` so it returns true, but infact there is no cycle in this graph.

### Using Toposort (BFS/DFS)
This can be done using the property of [[Topological Sort]]. Which is that a valid toposort can only be found for a **directed acyclic graph.**
So try to find the toposort of the graph and if the number of vertices in toposort < number vertices in the graph => cycle is present.
Below is the implementation given for the Kahn toposort.
```python
def kahn_toposort(adj):
	V = len(adj)
    # finding the indegrees
    indegrees = [0]*V
    for vertex in range(V):
        for nbr in adj[vertex]:
            indegrees[nbr] += 1
    q = deque()
    toposort = []
    for v, indegree in enumerate(indegrees):
        if indegree == 0:
            q.append(v)   # kind of like a multi source bfs
    while q:
        curr = q.popleft()
        toposort.append(curr)
        for nbr in adj[curr]:
            indegrees[nbr] -= 1
            if indegrees[nbr] == 0:
                q.append(nbr)

    return toposort
def check_cycle(adj):
	return len(adj) == len(kahn_toposort(adj))
```

### Using DFS alone
It can be done using DFS alone without the use of topological sorting. First of all we need to understand the nature of the cycles in Directed Graphs.

Let's assume we are doing a DFS traversal of a directed graph. We can say that there is a cycle in the graph if we visit a node that has already been visited in *the current depth line.*
See the diagram below-

![[Drawing 2023-08-26 01.48.03.excalidraw]]
Suppose the orange depth line is visited first by the DFS, it goes till vertex `3`. Then stops, the blue depth line goes all the way and meets the `x` again which is the part of the blue depth line. But see the tangent, where the DFS tries to go to the 3 which is already visited but it is not the part of the blue depth line and if its not the part of the current line there is no cycle even if we see a visited node.

So cycle detection becomes the trivial task of keeping track of overall visited nodes and the nodes seen in the current depth line. 
Keep a separate set to track the nodes in current depth line.

```python
def dir_cycle_dfs(adj, curr_depth_line, vertex, vis):
    vis.add(vertex)
    curr_depth_line.add(vertex)
    for nbr in adj[vertex]:
        if nbr not in vis:
            if dir_cycle_dfs(adj, curr_depth_line, nbr, vis):
                return True
        elif nbr in curr_depth_line: return True
    curr_depth_line.remove(vertex)  # this node & the nodes ahead of it in its depth line have been visited so it is not needed
    return False
```
```cpp
bool dir_cycle_dfs(vector<vector<int>> &adj, unordered_set<int> &curr_depth_line, int vertex, unordered_set<int> &vis){
	vis.insert(vertex);
	curr_depth_line.insert(vertex);
	for(auto const &nbr: adj){
		if(vis.count(nbr) == 0){
			if(dir_cycle_dfs(adj, curr_depth_line, nbr, vis)) return true;
		} else if(curr_depth_line.count(nbr)) return true;
	}
	curr_depth_line.erase(nbr);
	return false;
}
```
