Graphs are data structures made up of vertices and edges. Below is a simple undirected graph with some vertices and edges connecting them.

![[Drawing 2023-08-21 09.39.36.excalidraw]]

Some real life applications of graphs: 
1. Google Maps
2. Social networking sites to map the user data and build connections between users
3. Circuit Design, the electrical elements can be treated as nodes and the electrical connections as edges.
4. HTML and React DOM which are an [[N-ary]] tree or graphs.
5. Paint Bucket Tool
6. Packet switching in CCN.


## Conventions and terminology
### Path
Sequence of nodes from one node to another passing through edges.

![[Pasted image 20230821095302.png]]

**A closed path is when the initial node is same as the final node**. A closed path means there is a cycle.
### Cycle
A cycle is a closed path in which no two nodes are repeating except the first and the last node.

![[Pasted image 20230821095820.png]]

### Connected components
In a connected component there is a path between every 2 nodes or simply that there are no isolated nodes.
A graph may comprise more that one connected components

![[Drawing 2023-08-21 10.01.13.excalidraw]]
### Complete Graph
This is the infamous **mesh topology**. Every node is connected to every other node.
### Undirected Graph
The edges are not directional. The nodes appear on each other's [[adjacency lists]]. 
### Directed Graphs (Digraphs)
The edges are directional, we say "There is an edge from node A to node B".
### Weighted Graph
The edges have some weights associated with them.
### Acyclic Graph
This type of graph does not contain cycles.
### Bipartite Graph
Bipartite graph is a special type of graph whose vertices can be divided into 2 independent sets U and V such that every node in U has an edge connecting to a node in V.
Definition on color: Start with 2 colors and keep painting nodes with alternating colors, no two connected ones should have same color, if you can do that with just 2 colors, your graph is bipartite.

![[Pasted image 20230821101105.png]]


### Sparse & Dense Graph
A sparse graph is a graph in which there are not many edges between the nodes, In such types of graphs the adj matrix representation wastes a lot of space.
A dense graph is a graph in which there are large number of edges between the nodes. The adj matrix is suitable here, because of less number of zeros.

_**Dense graph**_ is a graph in which the number of edges is close to the maximal number of edges. _**Sparse graph**_ is a graph in which the number of edges is close to the minimal number of edges. _Sparse graph_ can be a [_disconnected graph_](http://mathworld.wolfram.com/DisconnectedGraph.html).

In a graph, the maximal number of edges refers to the total number of edges that a graph can have if all possible edges between distinct vertices are present. This value depends on the number of vertices in the graph. For an undirected graph with **V** vertices, the maximal number of edges is given by the formula:

Maximal Edges = **V** * (**V** - 1) / 2

The minimal number of edges in a graph depends on its structure. For an undirected graph, the minimal number of edges occurs in the case of a disconnected graph. In a disconnected graph, the graph is composed of two or more separate components that have no edges between them. The minimal number of edges in such a graph would be 0, as there are no connections between the components.
### Degree of a node
There are two types of degrees in a directed graph, if there is an edge coming toward a vertex then it counts as **indegree 1** for that node. Similarly there is **outdegree**.

### Cut
A cut is a partition of a graph vertices into two disjoint subsets. 
A **cut** _C_ = (_S_,_T_) is a partition of V of a graph _G_ = (_V_,_E_) into two subsets S and T. The **cut-set** of a cut _C_ = (_S_,_T_) is the set {(_u_,_v_) ∈ _E_ | _u_ ∈ _S_, _v_ ∈ _T_} i.e. both the pair has one node in S and the other node of the pair in T.

Minimum & Maximum Cut: Minimum possible cut in the graph(cuts least amount of edges), maximum is maximum possible cut (cuts largest number of Edges)

![[Drawing 2023-08-27 14.11.51.excalidraw]]