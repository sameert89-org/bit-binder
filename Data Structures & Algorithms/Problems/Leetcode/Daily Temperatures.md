#needcode150 #stack 

This is a classic pattern of `next_larger` this is efficiently solved using stacks. But still the **bruteforce** method is for each element find the next larger element by iterating normally, resulting in an $O(N^2)$ complexity.

The optimal way of doing this is using the [[Monotonic Data Structures#Monotonic Stack|Monotonic Stack]].

1. We find the answer in reverse, initally we have no temps, then for the last element it is 0 days till you get a warmer temperature.

2. We add this to the stack.
3. Then we move the second last element, we push it onto our monotonic stack, which stores *The temperatures in decreasing order*, means we remove any temperature in the stack which is smaller than the current day, which means *removal of all days after current day which are colder than current day* which makes us only push a day which is warmer than the current day, which is also an answer for the current day.
4. Add the day onto the stack.
5. Rinse and repeat
