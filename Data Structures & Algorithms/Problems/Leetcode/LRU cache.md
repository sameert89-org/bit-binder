#needcode150 #linked_list 
**LRU Cache** is a type of cache where if the capacity is filled then the *least recently used* key is evicted from the cache.

A key becomes recently used if:
- Its inserted
- Updated
- Fetched

The standard way of implementing this is by using a **Doubly Linked List** and a Hashmap

However it can easily get overwhelmingly complex if the linked list part is not implemented properly.

The main idea is to use two sentinel nodes to avoid having to check for null pointers. 

```cpp
class DlListNode {
public:
    int key;
    int val;
    DlListNode* next;
    DlListNode* prev;

    DlListNode(int key, int val, DlListNode* next, DlListNode* prev)
        : key(key), val(val), next(next), prev(prev) {};
};

typedef unordered_map<int, DlListNode*> umap;

class LRUCache {
private:
    DlListNode* head;
    DlListNode* tail;
    umap nodeMap;
    const int cap;
    void insertAtHead(DlListNode* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    DlListNode* popNode(DlListNode* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;

        node->prev = NULL;
        node->next = NULL;

        return node;
    }

public:
    LRUCache(int capacity) : cap(capacity) {
        head = new DlListNode(-1, -1, NULL, NULL);
        tail = new DlListNode(-1, -1, NULL, NULL);
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (!nodeMap.contains(key))
            return -1;

        DlListNode *node = nodeMap[key];

        insertAtHead(popNode(node));

        return node->val;
    }

    void put(int key, int value) {
        if (nodeMap.contains(key)) {
            DlListNode* node = nodeMap[key];
            node->val = value;
            insertAtHead(popNode(node));
            return;
        }

        DlListNode* newNode = new DlListNode(key, value, NULL, NULL);

        nodeMap[key] = newNode;

        insertAtHead(newNode);

        if (nodeMap.size() > cap) {
            nodeMap.erase(tail->prev->key);
            popNode(tail->prev);
        }
    }
};
```