#neetcode150  #arrays #hashing

Problem Link: https://leetcode.com/problems/contains-duplicate/

This is an easy problem, there are 2 approaches you can think of:

1. Use hashing, it's not required to use language's hashmap, since the space is small using a simple array for hashing is also feasible. This is solved in $O(N)$ time and space.
2. If space is a constraint a better solution is to use sorting, sort the string and just run a search if two adjacent elements are equal then you have a duplicate. This can be done using 2 pointers

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_map<int, int> m;
        for(auto i: nums){
            m[i]++;
            if(m[i]==2){
                return 1;
            }
        }
        return 0;
    }
};
```
