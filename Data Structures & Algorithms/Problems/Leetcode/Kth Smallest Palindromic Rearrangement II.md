#daily_challenge 
2026-07-29

### Ideas?
This is a very challenging problem, its easy to see the basic idea if you have solved these 2 before:

1. [Permutation Sequence](https://leetcode.com/problems/permutation-sequence/)
2. [Smallest Palindromic Rearrangement I](https://leetcode.com/problems/smallest-palindromic-rearrangement-i/)

The second problem tells us about how to make a palindrome, if you think about it only the first half of a palindrome truly matters. since the second part will be identical (or have 1 extra element if string has odd length).

This is because a palindrome can always be broken into 2 identical parts (minus the 1 odd character) that means the second half must be mirror image of first half which means the first half is the one that governs how second half must look, changing any order in second half *in order to get a smaller lexic string* will break the palindromic property.

So now I extract the first half it has $\frac{N}{2}!$  permutations (not all unique thought, more on it later).

Surely if N is small enough we can start with smallest permutation (which is nothing but sorted sequence) and then find the next permutation k times.

But the problem has $N = 10^4$ and $K = 10^6$ this would be $O(NK)$ in the best case which is slow. This takes us to problem i, which has the optimal solution of it by block skipping technique. Which gives us a rough idea on how to solve this problem.

### The main deviation
The main deviation here is that in the other problem N is small (only upto 9), and 9! is doable and you will have every element as unique.

This brings us to some math.

