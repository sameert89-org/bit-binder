#needcode150 #linked_list 

Problem Link: [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

Okay I need to construct a deep copy without modifying the list. Simple enough? right but they have to have a darn random pointer, god knows why.

In my head:

1. I will always construct the list first
2. Figure out the random pointers later.

Because I cannot do anything else, going to random pointer and trying to link it is impossible, because if node 1's random pointer points to node 7, the copy of node 7 is not constructed yet!

Okay the list is ready, but all the random pointers are not pointing anywhere.

Now I need a way to correlate the node positions in list 1 with list 2. How do I do this?

`Hashmap`, we can have a map that correlates the both, now I can simply iterate and find the corresponding node in the second l