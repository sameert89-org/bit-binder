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

Now I try assigning the random pointer using logic like this:

```cpp
copy->random = copy->random->random;
```

But this `copy->random` is already storing some crucial information i.e. the random pointer of the original node, and we just lost that.

Any combination having `random` of any list to save the info fails in similar fashion. Because you can not be sure that the random pointer you are overwriting is not going to be used in the future.

Therefore we have to use `next` somehow. This makes it even more complicated because `next` is used to constuct the list. We come up with the below abomination.

![[Copy List With Random Pointer 2026-03-23 23.49.25.excalidraw]]

This structure allows us to still traverse the list and assign randoms, we know that in this interleave every other node is duplicate. But we cannot restore the original list until all `random` pointers are assigned, because we need the original list to assign the randoms.

This makes us do 3 passes:

1. First pass to construct the interleaved list.
2. Second pass to assign the random pointers.
3. Third pass to restore the original list and extract the copy list.

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if(!head) return nullptr;
        // the intuition comes from a hashmap, why don't we try to use the random pointers as hashmaps?
        // OriginalNode->Next = CopyNode->Next and CopyNode->Next = OriginalNode->Next
        // first pass generate the lists with Next ZigZag
        Node *original = head;

        while(original) {
            auto copyNode = new Node(original->val);

            auto tmp = original->next;

            copyNode->next = tmp;

            // map original->next to new node
            original->next = copyNode;

            // advance original
            original = tmp; // use tmp because it now points to the copyNode

            // This is doing a zig zag insertion |/|/|
        }
        Node *trav = head;
        while(trav) {
            cout << trav->val << ", ";
            trav = trav->next;
        }
        // second pass point the randoms of copyList to their right place by using the Original->next as a map to CopyNodes
        original = head;
        Node* copyHead = head->next;
        Node *copy = copyHead;

        while(original) {
            if(original->random){
                copy->random = original->random->next;
            }
            original = copy->next;
            if(original)
                copy = original->next; // this would now be copy->next->next
        }

        // third pass restore the next interleaving
        original = head;
        copy = copyHead;

        while(original) {
            original->next = copy->next;
            if(original->next)
                copy->next = original->next->next;

            original = original->next;
            if(original)
                copy = copy->next;
        }

        return copyHead;
    }
};
```

There are annoying edge cases to handle. This question is annoying in general.
