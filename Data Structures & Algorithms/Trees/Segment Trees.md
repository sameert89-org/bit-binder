> A segment tree is a data structure which let's you answer range-queries in logarithmic time while also allowing range updates in logarithmic time.


> [!question]  What is a range query?
> A lot of times you have a list of elements and you want to answer certain queries like *give me the minimum number between indices i and j*, this can be done by just iterating over the range but that results in $O(N^2)$ complexity in the worst case and its very slow if you have to do it over and over.


Given an array of integers: `[1, 5, 2, 3, 1, -1, 15, 11, 2, 3, 9, -12]` find the minimum number in range range `[query_low, query_high]`

We start by building the tree, a built tree looks like below:
![[Segment Trees 2026-05-10 10.01.10.excalidraw]]

There is zero padding done to make the size a power of 2, it results in a [[Binary Trees#^cbt|complete binary tree]]. 

The number of nodes in the tree is `32` which is `2*N` hence the *time & space complexity of building the segment tree for an array of size N is O(N)* 

**Here is the key observation:** Each node stores the result of the operation (which is minimum in this case) of a range of nodes.

We can utilize this to answer our queries,
Take a look at a simple query: `[0, 7]` then the *left child* of the root node has our result.

We can recurse (or iterate) on this binary tree to find this answer.

But queries are not going to always be stored in a node, for example we may get an assymetrical query such as `[0, 9]` then we need a spliced result. To tackle this we can ask each subtrees to find the part of the query that lies within them. 

The general algorithm looks like this:

```text
fn query(Node* node, int query_low, int query_high) -> int:
	if(node overlaps exactly with [query_low, query_high]):
		return node.val;
	if(node does not overlap at all with [query_low, query_high]):
		return INF;
	return query(node.left, query_low, left_end) + query(node.right, left_end+1, query_high);
	
```

The problem with this is how do I know  whether the node overlaps? For the root node its easy to say that its interval is `[0, N - 1]` where N is the size of tree.

There is interesting math here, since its a complete binary tree we can calculate the number of elements in its subtrees, each of the children of the `ROOT` will have `N-1 / 2` nodes each. Hence the left child will have the sum of `[0, N / 2 - 1]`and  `[N/2,  N -1]` nodes, this becomes a recurrence. Hence we pass this information to our query method

```txt
fn query(Node* node,int node_left, int node_right, int query_low, int query_high) -> int:
	if(node overlaps exactly with [query_low, query_high]):
		return node.val;
	if(node does not overlap at all with [query_low, query_high]):
		return INF;
	int mid = (node_left + node_right)/2;
	return query(node.left, query_low,  mid - 1,  , left_end) + query(node.right, left_end+1, query_high);
```