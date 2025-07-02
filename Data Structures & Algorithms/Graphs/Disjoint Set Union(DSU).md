#### What is a disjoint set data structure?
A special <mark style="background: #CACFD9A6;">data structure that is used to tell whether a vertex `v` belongs to a connected component or not</mark>. Traditionally you would use DFS or BFS to traverse the component and try to find `v`, but Disjoint sets can do this <mark style="background: #CACFD9A6;">in O(1) time with respect to the DS</mark>.

<mark style="background: #FFB86CA6;">Time Complexity:</mark> $O(4*\alpha(n))$ Ackermann's Function
#### Union Find
A disjoint set data structure had 2 methods **union & find**. Union merges a vertex to the connected component of another vertex and does nothing if they belonged to the same component. Find tells the ultimate parent of the the nodes, if they are same they belong to the same component.
![[Drawing 2023-08-29 13.29.34.excalidraw]]

#### Path Compression
Take a look at the above graph, instead of joining the elements to their immediate parent in union operation, we do it to an ultimate parent of the whole component, the find function does the job of finding this ultimate parent.
#### Types of Union
- **Union by rank:** We calculate the union by a rank, the node with higher rank is assigned as the parent.
- **Union by size:** We calculate union by the number of nodes in a component. The vertex with larger component is assigned as the parent.

## Union By Rank

**What is rank?**
Rank is the estimate of the depth of the tree. Union by rank is an optimization technique of the union operation, in which we try to reduce the depth of the tree by merging the nodes according to rank.

```python
class DSU:
    parent = None
    rank = None
    
    def __init__(self, n):
        self.parent = [i for i in range(n)]
        self.rank = [0] * n
    
    def union(self, u, v):
        u, v = self.find(u), self.find(v)  # find the ultimate parents
        if u != v:
            if self.rank[u] >= self.rank[v]:
                self.parent[v] = u
            else:
                self.parent[u] = v
            self.rank[u] += self.rank[v] == self.rank[u]  # increases only when an equivalent forest is added, like the 2048 game.
            return True  # do not belong to the same component, union did happen
        return False  # belong to the same component and union did not happen
    
    def find(self, v):
        if self.parent[v] == v:
            return v
        self.parent[v] = self.find(self.parent[v])  # path compression happens here
        return self.parent[v]
```

```cpp
class DSU {
    vector<int> parent, rank;
    DSU(int n){
        parent.resize(n);
        iota(parent.begin(), parent.end(), 0);
        rank.resize(n);
    }
    int find(int u){
        if(parent[u] == u) return u;
        return parent[u] = find(parent[u]);
    }
    bool union(int u, int v){
        int u_root = find(u), v_root = find(v);
        if(u_root != v_root){
            if(rank[u_root] >= rank[v_root]) parent[v_root] = u_root;
            else parent[u_root] = v_root;
            rank[u_root] += rank[u_root] == rank[v_roo];
            return true;
        }
        return false;
    }
};
```

**Why does rank only increase when the ranks are same?**
![[Drawing 2023-08-29 18.39.55.excalidraw]]
Reason for attaching smaller to larger and not reverse. Because we do not want to increase the height of the tree which which increase our lookup time.

**Why path compression?**
It is another optimization technique that is used to speed up the disjoint set. It effectively reduces the height of the tree to an at max 2 in log(N) time complexity.
## Union by Size

```python
class DSU:
	parent = None
	size = None
	def __init__(self, n):
		self.parent = [i for i in range(n)]
		self.size = [1]*n
	def union(self, u, v):
		u_root, v_root = self.find(u), self.find(v)
		if u_root != v_root:
			if self.size[u_root] >= self.size[v_root]:
				self.size[u_root] += self.size[v_root]
                self.parent[v_root] = u_root
			else:
				self.size[v_root] += self.size[u_root]
				self.parent[u_root] = v_root
			return True
		return False
	def find(self, u):
		if self.parent[u] == u: return u
		self.parent[u] = self.find(self.parent[u])
		return self.parent[u]
```

