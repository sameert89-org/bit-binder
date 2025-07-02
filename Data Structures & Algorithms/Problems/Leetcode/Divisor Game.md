#math #dynamic_programming #1D_dp

# Problem Statement
Alice and Bob take turns playing a game, with Alice starting first.

Initially, there is a number `n` on the chalkboard. On each player's turn, that player makes a move consisting of:

- Choosing any `x` with `0 < x < n` and `n % x == 0`.
- Replacing the number `n` on the chalkboard with `n - x`.

Also, if a player cannot make a move, they lose the game.

Return `true` _if and only if Alice wins the game, assuming both players play optimally_.

**Example 1:**

**Input:** n = 2
**Output:** true
**Explanation:** Alice chooses 1, and Bob has no more moves.

**Example 2:**

**Input:** n = 3
**Output:** false
**Explanation:** Alice chooses 1, Bob chooses 1, and Alice has no more moves.

**Constraints:**

- `1 <= n <= 1000`


# Approach
it can be easily solved by observing the even odd relation to the winner, the one who gets an odd number loses always since there is no divisors in the range (0, 1). Anyone who gets even can give the other person odd by choosing 1 and force them to lose. So even is winner always.

## DP Approach

Let's say `dp[i] = true` when a players wins and 0 if they lose, then for any number n if there exists an `x` such that `n%x == 0` and it is the losing position for the other player if we can win. Since Alice gets the first pick for every n (DP n varies) she will try to find such index where she can move the game where `dp[i] is false` so that Bob goes and loses from that point. Now It is just a matter of checking all factors and the losing positions for Bob in that those. 

```python
class Solution:
    def divisorGame(self, n: int) -> bool:
        if n == 1: return False # base case
        dp = [0]*(n + 1)
        dp[2] = True  # base case
        for i in range(3, n + 1):
            j = 1
            while j*j < i:  # factors can only lie upto sqrt(n)
                if i%j == 0 and dp[i - j] == 0:
                    dp[i] = 1; break
                j += 1
        return dp[n]
```