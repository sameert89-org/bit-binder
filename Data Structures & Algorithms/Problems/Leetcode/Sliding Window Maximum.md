#needcode150  #sliding_window #monotonic_ds

Problem Link: https://leetcode.com/problems/sliding-window-maximum/description/

The first solution that comes to mind is running a sliding window over the array and calculate maximum for each of them.

But that does not work on larger test cases.

One of the optimal approaches is to use `std::multiset`, this allows us to track the maximum efficiently and pop the items optimally using binary search.

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        N = len(nums)
        res = []
        r = k
        l = 0
        sl = SortedList(nums[0:k])
        res.append(sl[-1])
        while r < N:
            # remove the left side
            idx = bisect.bisect_left(sl, nums[l], 0, len(sl))
            sl.pop(idx)
            sl.add(nums[r])
            res.append(sl[-1])
            l += 1
            r += 1
        
        return res
```

using the data structure is almost always overkill on Leetcode.

This is a classic problem for [[Monotonic Data Structures | Monotonic Queue]] 

![[Sliding Window Maximum 2026-03-18 18.37.58.excalidraw]]