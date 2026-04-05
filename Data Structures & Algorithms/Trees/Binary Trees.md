A binary tree is a linked data structure in which each node can have at most two children.

![[Binary Trees 2026-04-05 16.32.20.excalidraw]]

There are different classifications of binary trees based on their properties.

**Full Binary Trees:** Every Node has *0* or *2* children, no node has exactly one child.

**Complete Binary Trees:** All levels are completely filled except possibly the last level, which is filled from left to right.

**Perfect Binary Tree:** Every level is completely filled i.e. every internal node has exactly two children, and all leaves are at the same depth.

**Balanced Binary Tree:** The height of the left and right subtrees of every node differs by at most one..

**Binary Search Tree**: For every node, all values in its left subtree are smaller, and all values in its right subtree are larger (or equal, depending on the convention).


## Tree Traversals
Tree traversals are ways to visit all nodes in the tree. There are 4 main ways of doing a tree traversal.

### Pre Order Traversal
`root->left->right`

Visit the root node first, then visit the left subtree and finally the right subtree.

Below is the recursive implementation in C++
```cpp
void preOrder(TreeNode *root) {
	if(root == nullptr)
		return;
		
	cout << root->val << ",";
	
	preOrder(root->left);
	preOrder(root->right);
}
```

This can also be done iteratively. Below is the iterative implementation in C++. This is done using a stack.

```cpp
void preOrderIter(TreeNode *root) {
	if (root == nullptr) return;

	std::stack<TreeNode*> st;
	st.push(root);

	while (!st.empty()) {
		TreeNode *node = st.top();
		st.pop();

		cout << node->val << ",";

		if (node->right) st.push(node->right);
		if (node->left) st.push(node->left);
	}
}
```

### In Order Traversal
`left->root->right`

Visit the left subtree first, then the root node, and finally the right subtree.

Below are the recursive and iterative implementations:

```cpp
void inOrder(TreeNode *root) {
	if(root == nullptr)
		return;
		
	inOrder(root->left);
	cout << root->val << ",";
	inOrder(root->right);
}

void inOrderIter(TreeNode *root) {
	std::stack<TreeNode*> st;
	TreeNode *curr = root;

	while (curr != nullptr || !st.empty()) {
		while (curr != nullptr) {
			st.push(curr);
			curr = curr->left;
		}

		curr = st.top();
		st.pop();

		cout << curr->val << ",";

		curr = curr->right;
	}
}
```

### Post Order Traversal
`left->right->root`

Visit the left and right subtree first, then the root node.

Below are the recursive and iterative implementations

```cpp
void postOrder(TreeNode *root) {
	if (root == nullptr)
		return;

	postOrder(root->left);
	postOrder(root->right);
	cout << root->val << ",";
}
```

The iterative version can be done using 1 stack but it gets super hairy. One of the easiest ways to remember t his is to use a modified preorder

In pre-order: root->left->right, If we just swap `right` and `left` then we get `root->right->left` which is the reverse of post-order (left->right->root), so reversing the output gives post-order.

```cpp
void posOrderIter(TreeNode *root){
	
	stack<int> st, res;
	st.push(root);

	while(!st.empty()) {
		TreeNode *top = st.top();
		st.pop();
		
		res.push(top);
		
		st.push(root->left);
		st.push(root->right);
	}
	
	while(!res.empty()) {
		cout << res.top()->val << ",";
		res.pop();
	}
}
```

### Morris Traversal
Traversal Technique for binary trees without using recursion and without using stack using $O(1)$ space.

The core idea is that we want to use empty right pointers to temporarily link back to the parent.

When I want to do say, inorder traversal the main thing I want to do is the following:

`left->root->right` I want to keep going left then process the left then process the root and finally process the right. 

After going far left, how do I come back?

In case of *recursion* I use the recusion stack. If I am doing it iteratively I will use a *stack*.

I need one way to get back, *Morris* travesal uses the right pointers temporarily to create this backup path.

- If the current node has a left child, that means I would need to return to this node, I will create a path to this node by going to the rightmost leaf from here and linking its right side to the current node.

The most common traversal done using Morris method is in-order traversal.


```python
def morris_in_order(TreeNode root):
	TreeNode curr = root
	
	while curr:
		if curr.left is None:
			print(curr.val)
			curr = curr.right
		else:
			pred = curr.left
			while pred.right and pred.right != curr :
				pred = pred.right
			
			if pred.right is None:
				pred.right = curr
				curr = curr.left
			else:
				pred.right = None
				print(curr.val)
				curr = curr->right
		
```