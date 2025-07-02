Named after Adelson, Velsky and Landis. AVL Trees are <mark style="background: #FFB8EBA6;">height balanced binary search trees</mark>. These are in the same criteria [[Red and Black Trees]] and are used for maintaining a sorted collection with efficient insertion, deletion and search. 
They have more rigid balancing criteria than RBTs and are used when operation times need to be strict. The caveat is that they require larger number of rotations while insertion compared to RBTs.
This balancing is decided by balance factor.
$$Balance\ Factor (\gamma) = h_{left} - h_{right}$$
For a balanced BST, the following is true for each node.
$$ |\gamma_{node}| \leq 1,  \forall\ {node} \in Tree $$
## Insertion in AVL Tree
Simply perform the [[Insertion in a BST]]. This may create imbalance on some of the nodes. See the diagram below:

![[Drawing 2023-10-01 22.04.16.excalidraw]]

Depending upon the node at which imbalance is caused and the place where the new node is inserted, there are 4 types of imbalances possible.
```pseudocode
LL Imbalance: Inserted node is towards immediate left and then anywhere in the left of the immediate left.
LR Imbalance: Inserted node is toward immediate left and then anywhere in the right of the immediate left.
RL Imbalance: The RL imbalance occurs when a node is inserted towards the immediate right child of its parent and then anywhere in the left subtree of the immediate right child.
RR Imbalance: The RR imbalance occurs when a node is inserted towards the immediate right child of its parent and then anywhere in the right subtree of the immediate right child.
```

![[Drawing 2023-10-01 22.21.21.excalidraw]]

We perform **rotations** to fix these imbalances. Rotation is always done on 3 nodes at a time.
![[Drawing 2023-10-01 22.28.13.excalidraw]]

### General Form of Rotations
Always choose three nodes for rotations. The rotations have been shown for a large tree. The imbalance is an LL imbalance which is caused by an insertion somewhere in the C right sub (Right is still LL, I am not wrong think about it).

![[Drawing 2023-10-01 23.12.08.excalidraw|1000]]

