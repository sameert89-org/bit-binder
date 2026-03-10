#neetcode150  #bitwise 

Problem Link: https://leetcode.com/problems/reverse-bits/description/

```cpp
class Solution {
public:
    int reverseBits(int n) {
       int result = 0;
       for(int i = 0; i < 32; i++){
        bool is_ith_bit_set = (n >> i) & 1;
        // reverse this bit and create mask
        int mask = 0;
        if(is_ith_bit_set){
            mask = 1 << (32 - i - 1);
        }
        result |= mask;
       } 
       return result;
    }
};
```