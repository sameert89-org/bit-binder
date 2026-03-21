#needcode150  #binary-search 

This question is easy to solve but writing an optimal algorithm is the hard part.


> [!INFO] What is a median?
> Well it was 8th grade when I last studied statistics, so leaving a refresher here:
> For a sorted array the median is:
> If length is odd: (N + 1) / 2 (1 indexed)
> else: Average(N/2, N/2 + 1) (1 indexed)
> For 0 indexed just subtract 1 from everything, the array must be sorted

## Apprach 1: Combine sort then return

Straightforward

```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        return statistics.median(sorted(nums1+nums2))
```

**Time Complexity:** $O()$
**Space Complexity**: $O()$

**Time Complexity:** $O((M + N)\log(M + N))$
**Space Complexity**: $O(M + N)$


## Approach 2: Traverse without merging
I actually don't need to merge the arrays and waste space and time. I can move in a sorted manner using 2 pointers.

