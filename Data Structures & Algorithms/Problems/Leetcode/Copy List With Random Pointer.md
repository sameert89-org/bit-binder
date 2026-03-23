#needcode150 #linked_list

Problem Link: [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

Okay I need to construct a deep copy without modifying the list. Simple enough? right but they have to have a darn random pointer, god knows why.

In my head:

1. I will always construct the list first
2. Figure out the random pointers later.

Because I cannot do anything else, going to random pointer and trying to link it is impossible, because if node 1's random pointer points to node 7, the copy of node 7 is not constructed yet!

Okay the list is ready, but all the random pointers are not pointing anywhere.

Now I need a way to correlate the node positions in list 1 with list 2. How do I do this?

`Hashmap`, we can have a map that correlates the both, now I can simply iterate and find the corresponding node in the second list and then do the linking. I can construct the hashmap in the first pass itself.

This is still doable, but the main challenge is trying to do this in $O(1)$ space.

The intuition comes from the `Hashmap` can I use some pointers in the list1 to point to list2 ? (Why list1? because I need to find the corresponding node in list2 for the list1 node)

Which candidates do I have:

1. `random`
2. `next`

Let's try `random`, the first question is if random acts as the map, then who is going to store the random pointer of the original node?

This starts complicating stuff, the first thing comes to mind is to use list2's random pointer. But this faceplants.

Say I apply this and it looks something like this:

![[Copy List With Random Pointer 2026-03-23 23.41.28.excalidraw]]

Now I try assigning 