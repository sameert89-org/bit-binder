#neetcode150  #arrays #hashing 

Problem Link: https://leetcode.com/problems/product-of-array-except-self/description/

The simple bruteforce way is to calculate the product at every index and then outputting the answer, which lands at a complexity of $O(n^2)$ which is too slow.

A simple optimization would be to calculate the full product since its guaranteed to fit in a 32 bit integer, then divided each number while iterating, but the question prohibits division operation.

