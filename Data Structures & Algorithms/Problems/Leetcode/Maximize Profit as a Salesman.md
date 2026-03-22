#dynamic_programming #arrays
**Got stuck really bad here. I disproved greedy so should have started thinking about DP immediately but could not do it.**
**Difficulty:** Medium-Hard
## Problem Statement
You are given an integer `n` representing the number of houses on a number line, numbered from `0` to `n - 1`.

Additionally, you are given a 2D integer array `offers` where `offers[i] = [starti, endi, goldi]`, indicating that `ith` buyer wants to buy all the houses from `starti` to `endi` for `goldi` amount of gold.

As a salesman, your goal is to **maximize** your earnings by strategically selecting and selling houses to buyers.

Return _the maximum amount of gold you can earn_.

**Note** that different buyers can't buy the same house, and some houses may remain unsold.

**Example 1:**

**Input:** n = 5, offers = \[\[0,0,1],\[0,2,2],\[1,3,2]]
**Output:** 3
**Explanation:** There are 5 houses numbered from 0 to 4 and there are 3 purchase offers.
We sell houses in the range \[0,0] to 1st buyer for 1 gold and houses in the range [1,3] to 3rd buyer for 2 golds.
It can be proven that 3 is the maximum amount of gold we can achieve.

**Example 2:**

**Input:** n = 5, offers = \[\[0,0,1],\[0,2,10],\[1,3,2]]
**Output:** 10
**Explanation:** There are 5 houses numbered from 0 to 4 and there are 3 purchase offers.
We sell houses in the range \[0,2] to 2nd buyer for 10 golds.
It can be proven that 10 is the maximum amount of gold we can achieve.

**Constraints:**

- `1 <= n <= 105`
- `1 <= offers.length <= 105`
- `offers[i].length == 3`
- `0 <= starti <= endi <= n - 1`
- `1 <= goldi <= 103`

## Approach
So here goes the solution...
Basically you need to sell the houses but you cannot sell the houses you have already sold. Unless you are planning to scam someone. What is the optimal way of choosing the houses?
One might think we can go greedily and try to maximize the amount of profit that we are going to get from each buyer. This can be calculated as follows.
												$Profit = number_sold*price_of_each$
Now this does not work straight up from the first test case, no matter how you sort them you are not going to get a solution that maximizes the profit. You may chose to sell 0 to 2 only to find out you could've sold 0 and 1 to 3. I thought of merging intervals but that was in vain. So let's proceed to dynamic programming.

It is a variation of the knapsack problem. You basically have 2 choices, sell to the buyer and not sell to him. However I thought of this during DP thought process but then I had to keep track of the houses that I already sold using a set or something which cannot be DPed.

The solution to this problem is to use sorting and use a search to determine the next buyer if you sold one house. So if a buyer bought houses in range [x, y] then you must only sell houses that are before x-1 or after y + 1. It really helps to sort the array using the y, this way you don't have to worry about x - 1 due to left to right traversal and can use **Binary Search** to decrease your time to search the next buyer.
```python
class Solution:
    def maximizeTheProfit(self, n: int, offers: List[List[int]]) -> int:
        profit = 0
        N = len(offers)
        offers.sort(key = lambda x: x[0])
        @cache
        def solve(curr = 0):
            if curr == N: return 0
            not_sell = solve(curr + 1)
            sell = offers[curr][2] + \ # This is line break 😊
            solve(bisect_right(offers, offers[curr][1], lo = curr, key = lambda x: x[0]))
            return max(sell, not_sell)
        return solve()
```

So yeah the main logic lies in sorting the starting indices so that you can consider all the buyers in order.