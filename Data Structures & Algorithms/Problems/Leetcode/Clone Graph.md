#needcode150 #graphs 
The most obvious solution that came to mind was do 2 passes, create a hashmap of `originalNode->copyNode` then in the second pass populate the neighbors list. This is simlar to [[Copy List With Random Pointer]], but there exists a much cleaner single pass solution which builds nodes during the traversal.
Below is the BFS implementation:

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    Node* cloneGraph(Node* node) {
        if(!node) return node;
        // simple traversal
        queue<Node*> q;
        q.push(node);
        unordered_map<Node*, Node*> mp;
        mp[node] = new Node(node->val);

        while(!q.empty()) {
            Node *curr = q.front(); 
            q.pop();
            for(auto nbr: curr->neighbors){
                if(!mp.contains(nbr)) {
                    mp[nbr] = new Node(nbr->val);
                    q.push(nbr);
                }
                mp[curr]->neighbors.push_back(mp[nbr]);
            }
        }
        return mp[node];
    }
};
```