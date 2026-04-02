#needcode150 #linked_list 

Simple addition, fortunately the numbers are stored in reversed order.
 We can add them digit by digit, starting from the least significant digit.
 The part where I keep making things messy is where you need to manage the carry part. Since one number can have more digits than the other number, the carry needs to keep getting added.


Below is a clean implementation using a single loop.

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