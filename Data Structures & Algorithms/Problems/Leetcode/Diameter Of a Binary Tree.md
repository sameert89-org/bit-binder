#needcode150 #binary-tree 

The diameter = height of left subtree + height of right subtree

```cpp
class Solution {
public:
    int diameter = 0;
    int height(TreeNode* root){
        if(!root) return 0;

        int lHeight = height(root->left);
        int rHeight = height(root->right);

        diameter = max(diameter, lHeight + rHeight);

        return 1 + max(lHeight, rHeight);
    }
    int diameterOfBinaryTree(TreeNode* root) {
        diameter = 0;
        height(root);
        return diameter;
    }
};
```