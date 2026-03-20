#needcode150 #binary-search 

This is very similar to [[Minimum in Sorted and Rotated Arrays]]

Using the same logic I can determine in which half I am.

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        const int N = nums.size();
        // find which half target is in
        // left half if target > nums[0]
        // else right half
        // find mid, if its in the wrong half move to that half
        // then normal bin search while being in that half
        bool isTargetInLeftHalf = target >= nums[0]; // distinct values, if it were not we cannot say this for certain
        int s = 0, e = N - 1;
        while(s <= e) {
            int mid = s + (e - s) / 2;

            bool isMidInLeftHalf = nums[mid] >= nums[0];

            if(isMidInLeftHalf == isTargetInLeftHalf) {
                if(nums[mid] == target)
                    return mid;
                if(target > nums[mid])
                    s = mid + 1;
                else
                    e = mid - 1;
            } else {
                if(isTargetInLeftHalf) // mid in right half
                    e = mid - 1; // move towards left half
                else
                    s = mid + 1; // move towards right half
            }
        }
        return -1;
    }
};
```