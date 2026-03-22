#needcode150 #linked_list 

Problem Link: [143. Reorder List](https://leetcode.com/problems/reorder-list/)

This is a 3 stage problem, the easiest way of doing this would be to store it in another data structure then join the nodes appropriately.

To do it in constant space we first:
1. Find Middle
2. Rotate from the Middle to the End
3. Interleave the 2 lists

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        """
        Do not return anything, modify head in-place instead.
        """
        # find the mid and reverse from there, then interleave
        slow = head
        fast = head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        
        mid = slow.next
        slow.next = None
        #print(mid.val)
        prev = None
        
        while mid:
            temp = mid.next
            mid.next = prev
            prev = mid
            if temp is None:
                break
            mid = temp

        #print(mid.val)
        h1, h2 = head, mid
        

        res = ListNode(-1)
        pick_h1 = True
        while h1 and h2:
            if pick_h1:
                res.next = h1
                h1 = h1.next
            else:
                res.next = h2
                h2 = h2.next
                
            res = res.next
            pick_h1 = not pick_h1
        
        res.next = h1 if h1 else h2
```

Interleaving can be done without using dummy node:

![[Reorder List 2026-03-22 17.30.35.excalidraw|800]]
```python
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        slow = head
        fast = head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        
        mid = slow.next
        slow.next = None
        prev = None
        
        while mid:
            mid.next, prev, mid = prev, mid, mid.next

        h1, h2 = head, prev

        while h1 and h2: 
            tmp1, tmp2 = h1.next, h2.next
            h1.next, h2.next = h2, tmp1
            h1, h2 = tmp1, tmp2
```