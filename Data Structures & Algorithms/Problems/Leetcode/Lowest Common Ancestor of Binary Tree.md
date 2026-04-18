#needcode150 #binary-tree 

The general idea is to look for the *first* node which has both `p` and `q`

```cpp
class Solution {
public:
    pair<bool, bool> dfs(TreeNode* root, TreeNode* p, TreeNode* q, TreeNode*& ans) {
        if (!root) {
            return {false, false};
        }

        auto [leftHasP, leftHasQ] = dfs(root->left, p, q, ans);
        auto [rightHasP, rightHasQ] = dfs(root->right, p, q, ans);

        bool hasP = (root == p) || leftHasP || rightHasP;
        bool hasQ = (root == q) || leftHasQ || rightHasQ;

        if (!ans && hasP && hasQ) {
            ans = root; // first node which has both p and q
        }

        return {hasP, hasQ};
    }

    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        TreeNode* ans = nullptr;
        dfs(root, p, q, ans);
        return ans;
    }
};
```

An even cleaner solution is:
- if current node is p or q, return it
- ask left subtree what it found
- ask right subtree what it found
- if both found something, current node is LCA
- otherwise propagate the non-null one upward
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) {
            return root;
        }

        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        if (left && right) {
            return root;
        }

        return left ? left : right;
    }
};
```


### Special BST Case
The time complexity can be reduced for $O(N)$ to $O(H)$  if the tree is a BST.

Searching for `P` if current node is smaller than P then I have to go into the *right* subtree, if not then I have to go to the *left* subtree.

```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root != nullptr) {
            if (p->val < root->val && q->val < root->val) {
                root = root->left;
            } else if (p->val > root->val && q->val > root->val) {
                root = root->right;
            } else {
                return root;
            }
        }
        return nullptr;
    }
};
```

