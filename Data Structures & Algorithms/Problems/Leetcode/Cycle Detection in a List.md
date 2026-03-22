#needcode150 #linked_list 

Problem Link: [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

2 approaches, the bruteforce approach would be to use a hashset of all the nodes, keep checking whether you reach a node which is already there. This offers, linear time complexity but also needs $O(N)$ extra space.

The second is the infamous Floyd's tortoise and hare algorithm. Where there are 2 pointers, one moves faster in the list (2 steps at at time) and the other moves slower 1 step at a time. If there is a cycle, the hare is going to loop around and catch up with the tortoise, if they never meet means there is no cycle.

![[Cycle Detection in a List 2026-03-22 23.07.53.excalidraw|800]]

```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        nodeMap = set()
        trav = head
        while trav:
            if trav in nodeMap: return True
            nodeMap.add(trav)
            trav = trav.next
        return False
```

```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if head is None:
            return None
        tortoise = head
        hare = head.next

        while hare is not None and hare.next is not None:
            if tortoise == hare:
                return True
            hare = hare.next.next
            tortoise = tortoise.next
        return False
```