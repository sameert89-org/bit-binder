#needcode150 #binary-tree 


This problem cannot be done using In Order Traversal because more than one binary trees can have same post order. It does not preserve the information about which node is the root.

The following 3 binary trees have the same post order

```cpp
1 2 3

# possibility 1
   2
  / \
 1   3
 
# possibility 2
1
 \
  2
   \
    3
# possibility 3
    3
   /
  2
 /
1
```

Below is a preOrder implementation, which tracks size of subtrees to do this.

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
public:
    void fillPreOrder(string &res, TreeNode* root) {
        if(root == NULL) {
            res += "#,";
            return;
        }
        res += to_string(root->val) + ",";
        fillPreOrder(res, root->left);
        fillPreOrder(res, root->right);
    }
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string serializedTree = "";
        fillPreOrder(serializedTree, root);
        //cout << serializedTree;
        return serializedTree;
    }
    
    pair<TreeNode*, int> constructFromPreOrder(const vector<string> &preOrder, int i) {
        if(i >= preOrder.size())
            return {NULL, 0};

        if(preOrder[i] == "#")
            return {NULL, 1};

        TreeNode* root = new TreeNode(stoi(preOrder[i]));

        auto[left, leftSize] = constructFromPreOrder(preOrder, i + 1); 
        auto[right, rightSize] = constructFromPreOrder(preOrder, i + 1 + leftSize);

        root->left = left;
        root->right = right;

        return {root, 1 + rightSize + leftSize};
    }
    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data, int i = 0) {
        int N = data.size();
        vector<string> preOrder;
        string curr = "";
        for(int i = 0; i < N; i++) {
            if(data[i] == ',') {
                preOrder.push_back(curr);
                curr = "";
                continue;
            }
            curr += data[i];
        }
        auto [root, sz] = constructFromPreOrder(preOrder, 0);
        //cout << "\n" << sz;
        return root;
        
    }
};

// Your Codec object will be instantiated and called as such:
// Codec ser, deser;
// TreeNode* ans = deser.deserialize(ser.serialize(root));
```

A much cleaner way would be to use a shared index

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
public:
    void fillPreOrder(string &res, TreeNode* root) {
        if(root == NULL) {
            res += "#,";
            return;
        }
        res += to_string(root->val) + ",";
        fillPreOrder(res, root->left);
        fillPreOrder(res, root->right);
    }
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string serializedTree = "";
        fillPreOrder(serializedTree, root);
        //cout << serializedTree;
        return serializedTree;
    }
    
    TreeNode* constructFromPreOrder(const vector<string> &preOrder, int &i) {
        if(i >= preOrder.size())
            return NULL;

        if(preOrder[i] == "#") {
            i++;
            return NULL;
        }

        TreeNode* root = new TreeNode(stoi(preOrder[i++]));

        root->left = constructFromPreOrder(preOrder, i); 
        root->right = constructFromPreOrder(preOrder, i);

        return root;
    }
    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        int N = data.size();
        vector<string> preOrder;
        string curr = "";
        for(int i = 0; i < N; i++) {
            if(data[i] == ',') {
                preOrder.push_back(curr);
                curr = "";
                continue;
            }
            curr += data[i];
        }
        int i = 0;
        return constructFromPreOrder(preOrder, i);
    }
};

// Your Codec object will be instantiated and called as such:
// Codec ser, deser;
// TreeNode* ans = deser.deserialize(ser.serialize(root));
```