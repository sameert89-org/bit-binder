There we go I corrected the name
#neetcode150 #arrays #two-pointers 

Problem Link: https://leetcode.com/problems/3sum/description/

Obvious solution is to bruteforce it in $O(N^3)$

In order to optimize it we can run a map and an $O(N^2)$ algorithm to find the third index.

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        unordered_map<int, int> mp;
        for(int i = 0; i < nums.size(); i++){
            mp[nums[i]] = i;
        }
        int i = 0;
        vector<vector<int>> result;
        while(i < nums.size()){
            int j = i + 1;
            while(j < nums.size()){
                int target = -(nums[i] + nums[j]);
                if(mp.find(target) != mp.end() and mp[target] > i and mp[target] > j)
                    result.push_back({nums[i], nums[j], target});
                while(j + 1 < nums.size() && nums[j + 1] == nums[j]) j++; // skip dupes of nums[j]
                j++;
            }
            while(i + 1 < nums.size() && nums[i + 1] == nums[i]) i++; //skip dupes of nums[i]
            i++;
        }
        return result;
    }
};
```

This can be further simplified by just swapping the map logi