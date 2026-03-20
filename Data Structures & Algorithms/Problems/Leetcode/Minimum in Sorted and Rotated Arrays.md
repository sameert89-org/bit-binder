#needcode150 #binary-search 

Problem Link: [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

This is very intuitive having done Mountain Array Problems, you just need to draw it down

![[Minimum in Sorted and Rotated Arrays 2026-03-20 18.21.57.excalidraw]]

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        const int N = nums.size();
        // minimum would be the point of rotation
        int s = 0, e = N - 1;
        while(s <= e) {
            int mid = s + (e - s) / 2;
            if(mid + 1 < N and nums[mid] > nums[mid + 1])
                return nums[mid + 1];
            
            if(nums[mid] >= nums[0])
                s = mid + 1;
            else
                e = mid - 1;
        }
        return nums[0]; // fully sorted case
    }
};
```