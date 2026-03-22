#neetcode150 #bitwise #hashing

Problem Link: https://leetcode.com/problems/missing-number/description/

Bruteforce solution is to sort it and iterate. Or use a hashmap and iterate. 

A bit more optimal solution would be to sum all numbers and subtract the sum from sum of n whole numbers.

Optimal solution is to xor from 0 to n and then xor it with the array, the result of both xors will be the number.

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int res = 0;
        for(int i = 1; i <= nums.size(); i++){
            res ^= i;
        }
        for(int i = 0; i < nums.size(); i++){
            res ^= nums[i];
        }
        return res;
    }
};
```