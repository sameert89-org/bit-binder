#neetcode150 

Problem Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

The obvious solution is to bruteforce it try to buy on each day and check future days and calculate max profit. This results in $O(N^2)$ complexity.

An optimal way of doing this would be to keep track of the lowest price seen so far, and keep going forward, if we see a lower price we update the lowest price, at each place we update max with the profit = today's selling price - lowest price seen so far.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int lowest_price_so_far = INT_MAX;
        int max_profit = 0;
        for(int i = 0; i < prices.size(); i++){
            max_profit = max(max_profit, prices[i] - lowest_price_so_far);
            if(prices[i] < lowest_price_so_far){
                lowest_price_so_far = prices[i];
            }
        }
        return max_profit;
    }
};
```