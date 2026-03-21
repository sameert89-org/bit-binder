#needcode150 #linked_list 

Problem Link: [Merge Two Sorted Lists - LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/submissions/1954779686/)

Simply maintain 2 pointers

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode *trav1 = list1, *trav2 = list2;
        ListNode *head = new ListNode(-1);
        ListNode *tail = head;

        while(trav1 != nullptr and trav2 != nullptr){
            if(trav1->val < trav2->val){
                tail->next = trav1;
                trav1 = trav1->next;
            }
            else {
                tail->next = trav2;
                trav2 = trav2->next;
            }
            tail = tail->next;
        }

        tail->next = trav1 == nullptr ? trav2 : trav1;

        auto res = head->next;
        delete head;
        return res;
    }
};
```