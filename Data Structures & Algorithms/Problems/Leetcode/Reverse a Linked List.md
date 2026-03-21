#needcode150  #linked_list

I love linked lists!

Straightforward to do, just keep reversing the links:

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *trav = head;

        while(trav != nullptr) {
            auto temp = trav->next;
            trav->next = prev;
            prev = trav;
            trav = temp;
        }
        return prev;
    }
};
```