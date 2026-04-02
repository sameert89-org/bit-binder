#needcode150  #linked_list 
This problem is intuitive but its very very important that you draw out the problem, otherwise it becomes impossible to keep track of the pointers.

The easier way would be to store the heads of all k-lists and then reverse them, then perform the join operation and return the head.
But this requires extra space $O(N/k)$

An optimal way is to reverse as we go.

![[Reverse Nodes in k-groups 2026-04-02 16.51.26.excalidraw]]