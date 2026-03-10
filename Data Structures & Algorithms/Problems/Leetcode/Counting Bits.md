#neetcode150 #bitwise 

Problem Link: https://leetcode.com/problems/counting-bits/description/

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        def countBitsInNumber(k):
            count = 0
            mask = 1
            for i in range(32):
                count += (k >> i) & mask # ith bit is set or not
            return count
        
        result = []

        for i in range(0, n + 1):
            result.append(countBitsInNumber(i))
        
        return result
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        // recurrence relation
        // set_bits(n) = set_bits(n>>1) + (n & 1)
        vector<int> result(n + 1);
       for(int i = 0; i <= n; i++) {
        result[i] = result[i >> 1] + (i & 1); 
       }
       return result;
    }
};
```