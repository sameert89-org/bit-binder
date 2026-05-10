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

```t
```