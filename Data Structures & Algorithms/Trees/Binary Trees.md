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

```