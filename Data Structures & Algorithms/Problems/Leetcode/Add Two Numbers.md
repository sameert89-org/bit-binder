#needcode150 #linked_list 

Problem Link: https://leetcode.com/problems/add-two-numbers/

This follows simple addition logic, the code can be clever by handling carry in a single loop.

```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *trav1 = l1, *trav2 = l2;
        ListNode dummy(-1);
        ListNode* tail = &dummy;
        int carry = 0;
        while(trav1 or trav2) {
            int sum = carry;
            if(trav1) {
                sum += trav1->val;
                trav1 = trav1->next;
            }
            if (trav2){
                sum += trav2->val;
                trav2 = trav2->next;
            }
            tail->next = new ListNode(sum % 10);
            carry = sum / 10;
            tail = tail->next;
        }
        if(carry)
            tail->next = new ListNode(carry);

        return dummy.next;
    }
};
```