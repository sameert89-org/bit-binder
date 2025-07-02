You are given an array of `N` elements and you are also given `Q` queries, each query has a range `[l, r]` and you have to find perform whatever the query is in that range in the array and return the results.

Example: You have to calculate the minimum number for each query. 

### Brute Force Approach
Simply iterate from `l` to `r` and find out the minimum for each of them, the time complexity in this case is `O(N*Q)` which will result in TLE for large input sizes. 

### Segment Tree
The idea is to utilize a complete binary tree based data structure for storing the symmetric range queries and then calculating the values from the tree. A node has the following attributes.

```c++
struct segTreeNode{
	int result, index;  // result of the query operation for curr range
	pair<int, int> range;
	segTreeNode *left, *right;
}
```

Since this is a complete binary tree, it is beneficial for us to store it in an array.

```c++
vector<int> segTree(4*N);
```

For an array of `N` elements it has been mathematically proven that a segment tree of `4N` nodes is enough. 
In a zero indexed segment tree the root node has the index `0`, like heaps the following applies:
```
leftChild = 2*i + 1
rightChild = 2*i + 2
```
The root carries the answer for the whole range `[0, N-1]` and then we keep splitting the ranges in half for the left and right children.
![[Drawing 2023-09-13 15.28.51.excalidraw]]

Above picture gives a representation of a segment tree.

Below is the code for building the segment tree.

```c++

```
#### Calculation of queries in segment Trees

There are three rules to remember for calculating the results.
Given a query `[low, high]` we start from the root node. The following cases are possible:
1. **Case 1**: `No overlap` In this case the range of the current node does not overlap with the query in this case return an answer that does not affect the outcome. For example: for minimum value you may return `infinity` and for the sum problem you should return `0`.
2. **Case 2:** `Full Overlap` In this case the range of the current node is the same as the query range, just return the value stored in the node.
3. **Case 3:** `Partial Overlap` In this case the range of the current node partially overlaps with the given range, partial means some part lies in and some part lies out. In this case you call the query for the left and right child and combine the results.

Below is the code for finding the minimum value queries.
```
```

#### Point Updates in Segment Trees

Sometimes you may need to change the value of a certain index `i` of the array, instead of building the entire tree again we can use a point update algorithm to do it.
```
1. Start from the root node.
2. Check if the current Node is a leaf node range = the index to be updated.
3. If yes then change the answer in the tree and return it, else just return.
4. If the node is not a leaf node check whether the node lies in left range or right child range and call update accordingly. root.val = update(root.left) if i lies in range of root.left else root.val = update(root.right)
```