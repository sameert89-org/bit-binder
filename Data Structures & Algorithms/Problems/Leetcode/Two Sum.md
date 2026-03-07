#neetcode150 #arrays #hashing 

Problem Link: https://leetcode.com/problems/two-sum/description/

This is a beat up problem, there are too many approaches and harder variations.

For this particular problem the first approach that comes to mind is using a hashmap. But before that we need to brute force the problem in O(N^2), just run a nested loop which checks if  `target - nums[i]` exists.

We just store what numbers we have with their indices (since the indices need to be different), while we iterate on the array and search for `target - current_num` in our map, if we find the number then we return the set.

Why do we do it while iterating, because of duplicates, for a test case `[3,3]` where the target is 6, if we iterate and save everything before hand then the second three might be overridden and in that case we would need to store a list of numbers which gets really ugly really fast. Hence we just do it while iterating

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for(int i = 0; i < nums.size(); i++){
            if(mp.find(target - nums[i]) != mp.end()){
                return vector<int>{mp[target - nums[i]], i};
            }
            mp[nums[i]] = i;
        }
        // control should not reach here
        return vector<int>();
    }
};
```

If we want to avoid the extra space used by the hashmap, we can use sorting and two pointers.

If we sort the array in increasing order then we see an interesting pattern if we put two pointers at the start and at the end, if the sum of two numbers is greater than the target, we need to reduce the sum, then we decrement the pointer towards right. Since if we increment the left pointer the value is gonna grow even more.

This gives us an $O(nlogn)$ solution.

But we need to save the indices since they get overridden, hence forcing us to use extra space anyways.

There is really no constant space solution if the problem asks to return the indices.