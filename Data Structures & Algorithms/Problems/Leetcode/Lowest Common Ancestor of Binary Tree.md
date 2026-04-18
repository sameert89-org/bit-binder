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
```cpp
// Solution.cpp
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