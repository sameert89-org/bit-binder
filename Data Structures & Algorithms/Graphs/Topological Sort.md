Topological sorting is a specific ordering of the vertices of a graph that ensures that if there is an edge from u to v, then in the toposort u comes before v. This is only possible for <mark style="background: #ABF7F7A6;">Directed Acyclic Graphs.</mark>
There are various methods to find the topological sorting.
## Kahn's Algorithm (Toposort Using BFS)
This is a famous algorithm, it is a variation of the standard BFS. This algorithm is based on indegrees of the vertices. 
**Standard BFS** A vertex is popped from the queue only when all its neighbors have been pushed into the queue for visiting.
**Kahn's Algorithm** A vertex is popped from the queue only when its indegree becomes zero. Means all the nodes that had a directed edge to the current vertex have already been taken care of and put into the toposort. This is the intuition behind the algorithm.

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
```

```cpp
vector<int> kahn_toposort(vector<vector<int>> &adj){
    int V = adj.size();
    vector<int> indegrees(V);
    for(auto const &vertex: adj){
        for(auto const &neighbor: vertex){
            indegrees[neighbor]++;
        }
    }
    queue<int> q;
    vector<int> toposort;
    for(int vertex = 0; vertex < V; ++vertex){
        if(indegrees[vertex] == 0) q.push(vertex);
    }
    while(!q.empty()){
        int curr = q.front(); q.pop();
        toposort.push_back(curr);
        for(auto const &neighbor: adj[curr]){
            indegrees[neighbor]--;
            if(indegrees[neighbor] == 0) q.push(neighbor);
        }
    }
    return toposort;
}
```

## Toposort using DFS
The topological sort can also be found using DFS. How do you do it? just standard DFS but at the end of each call you just push the node that is done and dusted into the toposort. What we mean by done and dusted is that all the depths ahead of it have been searched meaning all the nodes that appear after it are already pushed into the toposort.
The keen eyed among the readers must have guessed that this seems the reverse of toposort. Yes it is reversed. So you have to reverse the list to get the toposort.

```python
def dfs_toposort(adj, vertex, vis, toposort):
    vis.add(vertex)
    for nbr in adj[vertex]:
        if nbr not in vis:
            dfs_toposort(adj, nbr, vis, toposort)
    toposort.append(vertex)
```

```cpp
void dfs_toposort(vector<vector<int>> &adj, int vertex, unordered_set<int> &vis, stack<int> &toposort){  // Notice the Stack
    vis.insert(vertex);
    for(auto const &nbr: adj[vertex]){
        if(vis.count(nbr) == 0)
            dfs_toposort(adj, nbr, vis, toposort);
    }
    toposort.push(vertex);
}
```

**Points to consider while using DFS for toposort:**
1. Make sure to reverse the toposort in the driver function.
2. Make sure to run the toposort for all connected components as BFS takes care of them because of the indegree calculations, DFS will not.

```python
def dfs_toposort(adj, vertex, vis, toposort):
    vis.add(vertex)
    for nbr in adj[vertex]:
        if nbr not in vis:
            dfs_toposort(adj, nbr, vis, toposort)
    toposort.append(vertex)

class Solution:
    def topoSort(self, V, adj):
        toposort = []
        vis = set()
        for i in range(V):
            if i not in vis:
                dfs_toposort(adj, i, vis, toposort)
        return list(reversed(toposort))
```

cool point about python: reversed returns an iterator and does not modify the original list. Where as sorted returns the sorted list.