#needcode150 #stack 

This is a classic pattern of `next_larger` this is efficiently solved using stacks. But still the **bruteforce** method is for each element find the next larger element by iterating normally, resulting in an $O(N^2)$ complexity.

The optimal way of doing this is using the [[Monotonic Data Structures#Monotonic Stack|Monotonic Stack]].

1. We find the answer in reverse, initally we have no temps, then for the last element it is 0 days till you get a warmer temperature.

2. We add this to the stack.
3. Then we move the second last element, we push it onto our monotonic stack, which stores *The temperatures in decreasing order*, means we remove any temperature in the stack which is less than or equal to than the current day, which means *removal of all days after current day which are colder than current day* which makes us only push a day which is warmer than the current day, which is also an answer for the current day.
4. Add the day onto the stack.
5. Rinse and repeat

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int N = temperatures.size();
        vector<int> res(N);
        stack<int> monoSt;

        for(int i = N - 1; i > -1; i--) {
            while(!monoSt.empty() and temperatures[monoSt.top()] <= temperatures[i]) // here we are storing indexes since question asks for that
                monoSt.pop();
            if(monoSt.empty())
                res[i] = 0;
            else
                res[i] = monoSt.top() - i;
            
            monoSt.push(i);
        }

        return res;
    }
};
```

### Complexity Analysis
Time Complexity: $O(N)$
Space Complexity: $O(N)$