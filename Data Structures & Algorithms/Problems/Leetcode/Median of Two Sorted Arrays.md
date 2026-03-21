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

```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        M = len(nums1)
        N = len(nums2)
        p1 = 0
        p2 = 0
        def move():
            nonlocal p1, p2
            ans = 0
            if p1 < M and p2 < N:
                if nums1[p1] < nums2[p2]:
                    ans = nums1[p1]
                    p1 += 1
                else:
                    ans = nums2[p2]
                    p2 += 1
            elif p1 >= M:
                ans = nums2[p2]
                p2 += 1
            else:
                ans = nums1[p1]
                p1 += 1
            return ans
        
        if (M + N) & 1:
            for i in range((M + N)//2):
                move()
            return move() # (M + N + 1) / 2 th element (1 indexed)
        for i in range((M + N) // 2 - 1):
            move()
        return(move() + move()) / 2
```

**Time Complexity:** $O(M + N)$
**Space Complexity**: $O(1)$

## Approach 3: Nested Binary Search

This is what I came up with, and it seems more intutitve and easier to generalize to 3 sorted arrays

![[Median of Two Sorted Arrays 2026-03-21 17.45.07.excalidraw]]

