#needcode150  #linked_list 

Apart from annoying edge cases, this is pretty straightforward. 

The naive way would be to store the elements in an array and remove the nth element from the end. 


A better space optimized solution would be to find the number of elements, then run over the list N - i - 1 th node and remove it.

The most optimal solution to do it in single pass is using two pointers.

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {        
        // take two pointers n apart and advace till one reaches the end
        ListNode dummy(-1, head); // to handle annoying cases where you need to remove the head
        ListNode *x = &dummy, *y = &dummy;

        for(int i = 0; i < n; i++)
            y = y->next;
        
        while(y->next){
            y = y->next;
            x = x->next;
        }

        auto tmp = x->next;
        x->next = x->next->next;
        delete tmp;
        return dummy.next;
    }
};
```

Another approach  without using the dummy node. The difference being in this solution x is the element that we need to remove, in the above solution it is the element just before that.
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {        
        // take two pointers n apart and advace till one reaches the end
        ListNode *x = head, *y = head, *prev = nullptr;

        for(int i = 0; i < n; i++) {
            y = y->next;
        }
        
        while(y){
            prev = x;
            y = y->next;
            x = x->next;
        }

        ListNode *tmp;
        if(!prev){
            tmp = head;
            head = head->next;
        } else {
            tmp = prev->next;
            prev->next = prev->next->next;
        }

        delete tmp;
        return head;
    }
};
```