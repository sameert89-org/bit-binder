#needcode150  #linked_list 
This problem is intuitive but its very very important that you draw out the problem, otherwise it becomes impossible to keep track of the pointers.

The easier way would be to store the heads of all k-lists and then reverse them, then perform the join operation and return the head.
But this requires extra space $O(N/k)$

An optimal way is to reverse as we go.

![[Reverse Nodes in k-groups 2026-04-02 16.51.26.excalidraw]]
We just need one extra step to track the overall head in the below solution:

```cpp
class Solution {
public:
	// reverses a NULL terminated linked list and  returns the new head and tail
    pair<ListNode*, ListNode*> reverseList(ListNode *const head) {
        ListNode *trav = head;
        ListNode *prev = NULL;

        while(trav) {
            ListNode *temp = trav->next;
            trav->next = prev;
            prev = trav;
            trav = temp;
        }

        return {prev, head};
    }
    ListNode* reverseKGroup(ListNode* head, int k) {
        int i = 1;
        ListNode *trav = head;
        ListNode dummy = ListNode(-1, head);
        ListNode *currHead = &dummy;

        while(trav) {
            if(i%k == 0) {
                ListNode *temp = trav->next;
                trav->next = NULL;
                auto [rh, rt] = reverseList(currHead->next);
                if(i == k)
                    dummy.next = rh;
                currHead->next = rh;
                currHead = rt;
                rt->next = temp;
                trav = rt;
            }
            trav = trav->next;
            i += 1;
        }

        return dummy.next;
    }
};
```