#neetcode150 #bit-manipulation

Problem Link: https://leetcode.com/problems/number-of-1-bits/description/

The thing that you want to learn here is how to convert decimal into binary.

```cpp
class Solution {
public:
    int hammingWeight(int n) {
        int i = 0, set_bits = 0;
        while(n > 0){
            set_bits += (n % 2);
            n /= 2;
        }
        return set_bits;
    }
};
```