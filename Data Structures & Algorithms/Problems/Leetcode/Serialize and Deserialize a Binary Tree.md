#needcode150 #binary-tree 


This problem cannot be done using In Order Traversal because more than one binary trees can have same post order. It does not preserve the information about which node is the root.

The follwing 3 binary trees have the same post order

```cpp
1 2 3

# possibility 1
   2
  / \
 1   3
 
# possibility 2

```