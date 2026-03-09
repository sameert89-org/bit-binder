#neetcode150  #arrays  #hashing 

Problem Link: https://leetcode.com/problems/longest-consecutive-sequence/description/

The simplest solution that comes to mind is using sorting, and then checking the contiguous elements in a linear manner, but this problem puts the constraint that you have to do it in linear time.

The hashing approach comes to mind next, I can hash whatever elements are present in a map, then I can run a dfs from each element to find the length.

![[Longest Consecutive Sequence 2026-03-09 21.50.32.excalidraw]]

```cpp
class Solution {
public:
    int dfs(int curr, unordered_set<int> &hashset){
        hashset.erase(curr);
        int left = 0, right = 0;
        if(hashset.find(curr - 1) != hashset.end())
            left = dfs(curr - 1, hashset);
        if(hashset.find(curr + 1) != hashset.end())
            right = dfs(curr + 1, hashset);
        
        return 1 + left + right;
    }
    int longestConsecutive(vector<int>& nums) {
       unordered_set<int> hashset(nums.begin(), nums.end());
       int result = 0;
       for(int i = 0; i < nums.size(); i++){
        result = max(result, dfs(nums[i], hashset));
       }
       return result;
    }
};
```

Despite being linear $O(N)$ in time, this requires $O(N)$ space as well.