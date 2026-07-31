#needcode150 #dp #1D_dp 

problem link: https://leetcode.com/problems/coin-change/description/

I got stuck really badly here, basically this is *unbounded knapsack* but due to being rusty, I wast overmodelling this problem like below.

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # dp[rem] = min coins needed to get rem
        # dp[rem] = min(dp[rem - a * b] for all a, b) where a is the denomination and b is the count
        # this results in tle
        INF = 10**18
        dp = [INF]*(amount + 1)
        dp[0] = 0

        for i in range(1, amount+1):
            minCoins = dp[i]
            for c in coins:
                rem = i
                coinCount = 0
                while rem >= 0:
                    minCoins = min(minCoins, coinCount + dp[rem])
                    rem -= c
                    coinCount += 1
            dp[i] = minCoins

        return dp[amount] if dp[amount] != INF else -1
```

This obviously **TLEs**, the main reason being I don't need to decide now that how many of a coin type I need to pick, I can let the subproblem handle this, I only pick one coin right now and let the subproblem get more of the same coin in case it needs it.

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # dp[rem] = min coins needed to get rem
        # dp[rem] = min(dp[rem - c] for all c), I do not need to pick multiple coins at once for a denomination immediately I only pick one and take the subproblem handle if it needs another denomination of the same coin I just used
        INF = 10**18
        dp = [INF]*(amount + 1)
        dp[0] = 0

        for i in range(1, amount+1):
            for c in coins:
                if i >= c:
                    dp[i] = min(dp[i], 1 + dp[i - c])

        return dp[amount] if dp[amount] != INF else -1
```