**LRU Cache** is a type of cache where if the capacity is filled then the *least recently used* key is evicted from the cache.

A key becomes recently used if:
- Its inserted
- Updated
- Fetched

The standard way of implementing this is by using a **Doubly Linked List** and a Hashmap

However it can easily get overwhelmingly complex if the linked list part is not implemented properly.

The main idea is to use two  sentinel nodes to avoid having to check for null pointers.

```cpp
class ListNode  {
    int key;
    int value;
    ListNode* prev;
    ListNode* next;
    ListNode(int k, int v) : key(k), value(v), prev(nullptr), next(nullptr) {}
};

```