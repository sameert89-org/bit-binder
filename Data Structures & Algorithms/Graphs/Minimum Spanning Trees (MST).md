**What is a spanning tree?**

For an connected & undirected graph, a spanning tree is a subgraph of the graph that is also a tree and connects all nodes together.

For a graph with V vertices, a spanning tree will have exactly V - 1 edges.

**Minimum Spanning Tree:** It is defined for a <mark style="background: #FFB8EBA6;">weighted undirected graph</mark> & is a spanning tree which has the minimum possible weights of the edges. So if there are 2 edges from node `u` to `v` then the edge with smaller weight will be chosen to keep them connected.

There are various algorithms for finding the Minimum Spanning Trees.

Cuz its a tree, it <mark style="background: #D2B3FFA6;">can't have cycles</mark> duh!

**Properties of MST**

1. If each edge weight is unique then there can be only one MST.
2. For every cycle in the graph, the edge with the largest weight in the cycle, cannot belong to any MST.
3. For a Cut C of a [[Graphs]] any edge E that belongs to the cut set of C that has the least weight out of all the edges of the cut set, belongs to all the edges of the cut set.

![[example1-1.webp|500]]![[example2-1.webp|500]]
There are various algorithms for finding the minimum spanning trees.

## Prim's Algorithm (MST)
#greedy 

**Intuition Behind the Prim's Algorithm:**
The cut property of MST is the intuition behind the algorithm. Consider the below graph:
![[Drawing 2023-08-29 11.13.50.excalidraw]]

It is a valid cut because it breaks the graph into two disjoint set of vertices. There are 2 edges in the cut-set of this cut. Edge with weight 1 and the edge with weight 5. Now according to the cut property, 1 has to be the part of the MST, we are not sure about 5, maybe its a part maybe its not. But we got one surity to we push that into the MST. We keep doing this for all the nodes and get the edges that are sure. When all the vertices are checked then we have the final MST.
In the case of this graph, below are the steps:
![[Drawing 2023-08-29 11.23.21.excalidraw]]
In the above steps, the edge with weight 5 is the only one that was not confirmed to be a part of the MST, so it is not the part of the MST.

So the algorithm is making cuts, keeping the track of the cut-set and choosing the minimum every time. We utilize a **priority queue** for this task. vis means the node has become the part of the MST.
<mark style="background: #FFB86CA6;">Time Complexity:</mark> Elog(E)
<mark style="background: #FFB86CA6;">Space Complexity:</mark> O(E)

```python
def prims_mst(adj):
	V = len(adj)
	vis = set()
	mst = []  # contains the edges u,v that are part of the MST
	pq = [(0, 0, -1)]  # (weight, node, parent)
	mst_wt = 0
	while pq:
		wt, curr, par = heapq.heappop(pq)
		if curr not in vis:  # PITFALL, pq may have already visited nodes because we have to revisit nodes like above diagram, more than once to make sure that they get 0 tick marks
			for nbr, w in adj[curr]:
				heapq.heappush(pq, (w, nbr, curr))
				# not adding the nbr to visited here
    		vis.add(curr)  # because of the PITFALL we have to keep it here.
    		if par != -1:
    		    mst_wt += wt
    		    mst.append((par, curr))
	return (mst_wt, mst)
```

```cpp
struct Edge {
    int weight;
    int node;
    int parent;

    Edge(int w, int n, int p) : weight(w), node(n), parent(p) {}

    bool operator>(const Edge& other) const {
        return weight > other.weight;
    }
};

typedef vector<vector<pair<int, int>>> AdjList;  // List of (node, weight) pairs

pair<int, vector<pair<int, int>>> primsMST(const AdjList& adj) {
    int V = adj.size();
    set<int> vis;
    vector<pair<int, int>> mst;  // contains the edges (u, v) that are part of the MST
    priority_queue<Edge, vector<Edge>, greater<Edge>> pq;
    int mst_wt = 0;

    pq.push(Edge(0, 0, -1));

    while (!pq.empty()) {
        Edge e = pq.top();
        pq.pop();

        if (vis.find(e.node) == vis.end()) {
            for (const auto& neighbor : adj[e.node]) {
                pq.push(Edge(neighbor.second, neighbor.first, e.node));
            }

            vis.insert(e.node);

            if (e.parent != -1) {
                mst_wt += e.weight;
                mst.push_back(make_pair(e.parent, e.node));
            }
        }
    }

    return make_pair(mst_wt, mst);
}
```
## Kruskal's Algorithm for MST
This is where we introduce the concept of [[Disjoint Set Union(DSU)]] to you, go ahead and read that and come back & this algorithm will be a breeze.

**Intuition behind Kruskal's Algorithm**
This is much more intuitive, because unlike prims algorithm you do not need to know any properties. So let us ask ourselves what is the MST?
Tree with V vertices and V - 1 edges that has the minimum weight. Every edge is crucial in the MST and we do not need extra edges that serve no purpose.

There it is, we take the smallest weight edges one by one and do a union of those, if the nodes of the edge already belong to the same component means that there is already a minimum path that lighter edge have made between the two nodes in discussion, so we do not need this extra edge.

Now that you have done that 😊 let's move too the Kruskal's algorithm.
```python
# import DSU class here
def kruskals_mst(adj):
	V = len(adj)
	ds = DSU(V)  # initialize the Disjoint Set
	mst, mst_wt = [], 0
	# Constucting a sorted edge list
	pq = []
	vis = set()
	for i in range(V):
		for nbr, wt in adj[i]:
			if (nbr, i) not in vis:
				pq.append((wt, i, nbr))
				vis.add((i, nbr))
	heapq.heapify(pq) # you can also just reverse sort and use pop
	# perform union find to get MST
	while pq:
		w, u, v = heapq.heappop(pq)
		if ds.find(u) != ds.find(v):
			ds.union(u, v)
			mst_wt += w
			mst.append((u, v))
		if len(mst) == V - 1: break
	return (mst_wt, mst)
```