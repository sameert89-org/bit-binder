Another important domain in graph theory is the ability to find the shortest distance between a source vertex & a destination vertex. There are a lot of path finding algorithms. Each one of them has their merits and demerits.

## Dijkstra's Algorithm
#greedy #bfs
1. Finds the shortest path from <mark style="background: #FFB8EBA6;">source node to all other nodes.</mark>
2. Directed/undirected graph does not matter.
3. <mark style="background: #FF5582A6;">Does not work when the graphs have negative edges/negative weight cycles</mark> (more on this below #7).
4. Can use set/heap to reduce the time taken and number of calls than using a queue.
5. <mark style="background: #FFB86CA6;">Time Complexity:</mark> O(ElogV) for adj list using heap. O(V^2) for adjacency matrix. In case you used queue instead of min heap, it jumps to O(V\*E) due to suboptimal calls.
6. <mark style="background: #FFB86CA6;">Space Complexity:</mark> O(V)
7. It is again a variation of BFS, instead of using a visited array we rely on the logic that when we try to revisit an already visited thing (The main purpose of having the visited array in the first place). If we have a positive weight the distance is never going to decrease so we are not going to repush stuff into the queue. This is why Dijkstra's algorithm fails for negative loop cycles because it keeps revolving at the loop. If there are no negative cycles but a negative edge, like for a directed graph it still can produce incorrect answers due to negative edges and have unnecessary extra calls.

![[Drawing 2023-08-26 13.15.15.excalidraw]]
I do not like writing algorithms, I think the algorithms are best defined by the code. So here is the code for the Dijkstra's algorithm.

```python
def dijkstra(adj, S):
        q = [(0, S)]
        heapq.heapify(q)
        dist = [float('inf') for _ in range(V)]
        dist[S] = 0
        while q:
            distance, curr = heapq.heappop(q)
            for nbr, wt in adj[curr]:
                if distance + wt < dist[nbr]:
                    dist[nbr] = distance + wt  # distance and dist[curr] are the same thing and they represent current shortest known path to curr
                    heapq.heappush(q, (dist[nbr], nbr))  # Push the updated distance to the queue when you see a new known shortest path
        return [i if i != float('inf') else -1 for i in dist]
```

```cpp
vector<int> dijkstra(vector<vector<int>> &adj, int S){
	int V = adj.size();
	priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>> pq; pq.push({0, S});
	vector<int> dist(V, INT_MAX); dist[S] = 0;
	while(!q.empty()){
		auto [distance, curr] = pq.front(); pq.pop();
		for(auto nbr_wt: adj[curr]){
			int nbr = nbr_wt[0], wt = nbr_wt[1];
			if(distance + wt < dist[nbr]){
				dist[nbr] = distance + wt;
				pq.push({dist[nbr], nbr});
			}
		}
	}
	return distance;  // Make sure to replace INT_MAX if asked in the problem
}
```

### Printing the shortest path
You may also require to print or fetch the actual shortest path, instead of the distances. This can also be done using Dijkstra's algorithm. Store the previous elements to each element in a prev array and then traverse it to find the distances.

```python
def dijkstra_path(adj, S):
		V = len(adj)
        q = [(0, S)]
        heapq.heapify(q)
        dist = [float('inf')]*V; dist[S] = 0
        prev = [-1]*V
        while q:
            distance, curr = heapq.heappop(q)
            for nbr, wt in adj[curr]:
                if distance + wt < dist[nbr]:
                    dist[nbr] = distance + wt
                    prev[nbr] = curr
                    heapq.heappush(q, (dist[nbr], nbr))
        return (dist, prev)
```
Now suppose you need to find the shortest path from vertex 0 to vertex 6. So first push 6 into a stack, then go to prev\[6] and push it into the stack and then go to prev of this prev, do this until you reach source.
## Bellman Ford Algorithm
#dp #bfs
This is another path finding algorithm, this however works in case of negative edges unlike Dijkstra. In case of negative cycles too, this can be used to find the presence of such cycles. <mark style="background: #FFB8EBA6;">Source to all nodes.</mark>
Can be applied on any graph, be it directed or undirected. Undirected weighted graph can be treated like a directed graph, with 2 arrows with same weight coming into and going out from the nodes.
<mark style="background: #FFB86CA6;">Time Complexity:</mark>  O(V\*E)
<mark style="background: #FFB86CA6;">Space Complexity:</mark> O(E)
The time complexity is worse than Dijkstra.

*Note: There is no notion of shortest path in case of negative cycles, cause if you start from a node and come back to the same node and your net cost is smaller then you will keep on revolving on the cycle. So we only detect the presence of such cycles.*

**How does it work?**
For a graph with V vertices, you need to relax each edge V - 1 times.
The Bellman Ford Algorithm just estimates the distances of all nodes from the source node and then updates the distances as more and more shorter ways are discovered.

In first iteration, the immediate neighbors of the source are relaxed. In second iteration neighbors of these neighbors are relaxed, In BFS in this step the previous neighbors have been kicked out of the queue, but Bellman ford does it for all the nodes thereby ensuring a shortest path. 
Why V - 1 iterations. For any graph with V vertices, you need at most V-1 traversals through all edges to relax them into shortest distances. Due to fixed amount of iterations, we do not need to worry about infinite cycles.

**Detecting Negative Weight Cycles**
After you are done calculating the loop V - 1 times, rerun the loop again, if the distances still reduce for atleast one vertex, that means there is a negative cycle present.

**Why V - 1 iterations?**
That seems like such a random number like tennis scoreboards. But it is not consider a graph with `v` vertices. Lets take the source node `s`. Let me ask you this, what is the maximum number of ways that can come out of this source to visit all other nodes? It is V - 1 see the diagram below.

![[Drawing 2023-08-26 16.50.59.excalidraw]]
Since you are going through every edge V - 1 times, it is guaranteed that from any node to any other node (at max V - 1 things can come out) the edges will be covered in the loops.
#### Code
```python
def bellman_ford(adj, S, check_neg):
	V = len(adj)
	dist = [float('inf')]*V
	dist[S] = 0
	for i in range(V-1):
		# traversing each edge
		for vertex, nbrs in enumerate(adj):
			for nbr, wt in nbrs:
				# relaxing the edges if needed
				if dist[vertex] + wt < dist[nbr]:
					dist[nbr] = dist[vertex] + wt
	neg_cycles = False
	if check_neg:
		for vertex, nbrs in enumerate(adj):
			for nbr, wt in nbrs:
				if dist[vertex] + wt < dist[nbr]:
					neg_cycles = True
					break
	return (dist, neg_cycles) if check_neg else dist
```

```cpp
pair<vector<int>, bool> bellman_ford(vector<vector<int>> &adj, int S){
	int V = adj.size();
	bool neg_cycles = false;
	vector<int> dist(V, INT_MAX); dist[S] = 0;
	for(int i = 0; i < V; i++){
		// Traversing the edges
		for(int u = 0; u < V; u++){
			for(auto const &[v, w]: adj[u]){
			// Relaxing the edges
				if(dist[u] + w < dist[v]){
					dist[v] = dist[u] + w;
					if i == V: neg_cycles = true;
				}
			}
		}
	}
	return make_pair(dist, neg_cycles);
}
```

## Shortest path with BFS
- <mark style="background: #FF5582A6;">This only works for unweighted graphs. </mark>We assume the weights to be 1.
- <mark style="background: #FFB8EBA6;">Used for source to single destination.</mark>
- Why do we even use this? This is slightly faster than the Dijkstra's algorithm for this particular graph.
- <mark style="background: #FFB86CA6;">Time Complexity:</mark> O(V + E)
- <mark style="background: #FFB86CA6;">Space Complexity:</mark> O(V)

This is used in problems where you need to fetch the actual shortest path between two nodes. [[Snakes & Ladders]]

```python
def BFS(adj, src, dest, v, pred, dist):
 
    # a queue to maintain queue of vertices whose
    # adjacency list is to be scanned as per normal
    # DFS algorithm
    queue = []
  
    # boolean array visited[] which stores the
    # information whether ith vertex is reached
    # at least once in the Breadth first search
    visited = [False for i in range(v)];
  
    # initially all vertices are unvisited
    # so v[i] for all i is false
    # and as no path is yet constructed
    # dist[i] for all i set to infinity
    for i in range(v):
 
        dist[i] = 1000000
        pred[i] = -1;
     
    # now source is first to be visited and
    # distance from source to itself should be 0
    visited[src] = True;
    dist[src] = 0;
    queue.append(src);
  
    # standard BFS algorithm
    while (len(queue) != 0):
        u = queue[0];
        queue.pop(0);
        for i in range(len(adj[u])):
         
            if (visited[adj[u][i]] == False):
                visited[adj[u][i]] = True;
                dist[adj[u][i]] = dist[u] + 1;
                pred[adj[u][i]] = u;
                queue.append(adj[u][i]);
  
                # We stop BFS when we find
                # destination.
                if (adj[u][i] == dest):
                    return True;
  
    return False;
```



## Shortest path using Topological Sort

I have no clue why this exists and is important. 

## Floyd Warshall Algorithm
#dp

- This is a multi source shortest path finding algorithm. From <mark style="background: #FFB8EBA6;">every node to every other node.</mark>
- Works for negative edges and cycles as well.
- <mark style="background: #FFB86CA6;">Time Complexity:</mark> O($N^3$)
- <mark style="background: #FFB86CA6;">Space Complexity:</mark> O($V^2$)

**How does it work:**
1. <mark style="background: #ABF7F7A6;">Require adjacency matrix</mark> for implementing this algorithm.
2. You go from every node $A_i$ to $B_i$. You either go through directly or try to go through some other intermediate node $X_i$. Now it is not guaranteed that you will reach the destination (may have $\infty$ distance). You keep doing this for all nodes over and over. 
3. Choose each node as intermediate node and for each iteration, try to go directly to the node A to B and try to go from that chosen intermediate node. And minimize the distance
				`A[i][j] = min(A[i][j], A[i][x] + A[x][j])`
4. Once you are done with choosing all the nodes as intermediate node, the final matrix will give you shortest distance from every node to every other node.

```python
def floyd_warshall(adj, check_neg):
	V = len(adj)
	cost_matrix = [[i if i != -1 else float('inf') for i in row] for row in adj]
	for x in range(V):
		for i in range(V):
			for j in range(V):
			    cost_matrix[i][j] = min(cost_matrix[i][j], cost_matrix[i][x] + cost_matrix[x][j])
	neg_cycle = False
	if check_neg:
		for i in range(V):
			if cost_matrix[i][i] < 0:
				neg_cycle = True
				break
	return cost_matrix if not check_neg else (cost_matrix, neg_cycle)
```
Silly little goose 🦆 tip about python. When you pass a list to a function, you are essentially passing a reference to the list object (since everything is a object in python). You can modify the contents and it will reflect in the original object, but once you reassign the thing, you are reassigning the pointer to a new object. IT IS NOT GOING TO REFLECT IN THE ORIGINAL OBJECT, THE LINK IS JUST LOST.
```cpp
pair<vector<vector<int>>, bool> floyd_warshall(vector<vector<int>> adj, bool check_neg){
	int V = adj.size();
	vector<vector<int>> cost_matrix(adj);
	for(int i = 0; i < V; i++){
		for(int j = 0; j < V; j++)
			if(adj[i][j] == -1) cost_matrix[i][j] = INT_MAX;
	}
	for(int x = 0; x < V; x++){
		for(int i = 0; i < V; i++){
			for(int j = 0; j < V; j++){
				if(cost_matrix[i][x] != INT_MAX and 
				cost_matrix[x][j] != INT_MAX){
					cost_matrix[i][j] = min(cost_matrix[i][j],
					cost_matrix[i][x] + cost_matrix[x][j]);
				}
			}
		}
	}
	neg_cycle = false;
	for(int i = 0; i < V; i++){
		if(cost_matrix[i][i] < 0){
			neg_cycle = 0;
			break;
		}
	}
	return make_pair(cost_matrix, neg_cycle);
}
```
## A* Search Algorithm
This is an extension of Dijkstra's algorithm It is used in many real world applications.
Dijkstra is a greedy algorithm so it can only looks for the current visible shortest path. This can still not be fastest since in cases there may be an overall shortest route which may appear to be far at first. A* introduces a **heuristic** which tells the algorithm that tells the algorithm that it is getting close. So instead of using the greedy distance for ordering the priority queue or the set, we use this heuristic distance. It is an estimated distance however so it cannot be taken into account for actual calculation, it is just for producing a current that propels the algorithm to converge faster.
![[Drawing 2023-08-26 21.55.35.excalidraw]]
	As you can see in the above diagram, Dijkstra will push the nodes `x` and `y`, but the priority queue will put the 3 weighted node first, this will create unnecessary calls. Because we will move on in the path of `y` and visit the nodes `p`, `q` and `r`, but later on their distances are reupdated from the path of `x`. If we had an approximate distance called **heuristic**. We could have introduced a bias in the algorithm for picking better paths. 

There can be various heuristics like manhatten distance, euclidian distance etc. A* may not produce shortest paths always, it heavily depends on correct modelling of the heuristics.

The code will not be provided here, as it is not useful in problem solving on platforms.