#neetcode150  #arrays #hashing 

Problem Link: https://leetcode.com/problems/product-of-array-except-self/description/

The simple bruteforce way is to calculate the product at every index and then outputting the answer, which lands at a complexity of $O(n^2)$ which is too slow.

A simple optimization would be to calculate the full product since its guaranteed to fit in a 32 bit integer, then divided each number while iterating, but the question prohibits division operation.

one approach comes to mind its better to draw it here:

![[Product of Array Except Itself 2026-03-08 12.09.24.excalidraw]]

If we could use 2 hashmaps (or 1 hashmap) one that stores the prefix products and one that stores the suffix products to and from each index respectively the problem becomes as simple as iterating over the index and finding the prefix and suffix product and then multiplying both to get the answer.