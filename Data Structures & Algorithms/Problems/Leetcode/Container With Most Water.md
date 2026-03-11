#needcode150  #two-pointers  #greedy 

The most basic solution is to bruteforce this in $O(N^2)$. This can be optimized using the following greedy approach.

The `result = d * min(h1, h2)`

The maximum value of d is observed between tower `0` and tower `n-1`. I start with those 2 towers, now I say *I will skip over the smaller tower* greedily.

**Proof**:

Let's assume skipping over smaller tower is not right and I should have skipped over the larger tower. That means between 0 and n - 2 there exists a tower whose result with tower 0 is > than the one with tower n - 1.

That tower could be either:

1. Smaller than tower 0
2. Equal to tower 0
3. Greater than tower 0

In all 3 cases the 
