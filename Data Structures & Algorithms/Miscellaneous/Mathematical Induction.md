Mathematical Induction is a mathematical technique _which is used to prove a statement, a formula or a theorem is true for every natural number_.

It can be used to prove some pain in the ass greedy algorithms in your head so that you can start coding.

# Statement

if $R(0)$ holds and $\forall n, R(n) \implies R(n + 1)$, then $\forall m, R(m)$ also holds.

*Example:* There are N balls, and the first ball is red. And if nth ball is of color x then (n + 1)th ball is also of color x. Then we can conclude that all balls are red.

If you topple the domino at position 0, all dominoes topple.

# Steps to prove
1. **Induction hypothesis**: Define your induction hypothesis.
2. **Prove for Base case**: Prove that your hypothesis is true for base case.
3. **Assume hypothesis to be true of P(n)**
4. **Prove for P(n + 1) using 2 and 3**

**Proof for N meetings in a room**

![[Pasted image 20230924234109.png]]
# Greedy Problems

Following resource is excellent for understanding some most frequent and established greedy problems. More problems are in this brain in the #greedy tag.

![[04-greedy.pdf]]