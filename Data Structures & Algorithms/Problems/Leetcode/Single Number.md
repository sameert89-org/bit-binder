#needcode150 #bit-manipulation #strings

Problem Link: https://leetcode.com/problems/single-number/description/

The simple approach is to sort the string. 

With the complexity of $O(Nlog(N))$

Or second frequency map

Most optimized XOR

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        initial = nums[0]

        for i in range(1, len(nums)):
            initial ^= nums[i]

        return initial
```
