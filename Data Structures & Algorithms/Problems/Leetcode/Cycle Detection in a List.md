#needcode150 #linked_list 

Problem Link: [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

2 approaches, the bruteforce approach would be to use a hashset of all the nodes, keep checking whether you reach a node which is already there. This offers, linear time complexity but also needs $O(N)$ extra space.

The second is the infamous Floyd's tortoise and hare algorithm.