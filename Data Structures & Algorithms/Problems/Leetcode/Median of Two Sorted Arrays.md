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

I did hit a roadblock due to duplicate elements, hence I handled it usign a range calculation:

```cpp
#include<format>
class Solution {
public:
    // finds the index i in the array which would be sorted + merged (nums1 and nums2)
    // complexity logmlogn + logmlogn
    int findIndex(const int i, const vector<int> &nums1, const vector<int> &nums2) {
        // search in first array
        int s = 0, e = nums1.size() - 1; 

        while(s <= e) {
            int mid = s + (e - s)/2;
            pair<int, int> actualPosRange = {mid + (lower_bound(nums2.begin(), nums2.end(), nums1[mid]) - nums2.begin()), mid + (upper_bound(nums2.begin(), nums2.end(), nums1[mid]) - nums2.begin())};
            // this gives us a range where the number can lie in, range because of darn duplicates, you cannot find strictly less than or strictly greater than numbers, because if you did that there is position bias, [0, 0] and [0, 0] in this case, if I was searching in array 1 and just used ub or lb, the second array will always return me 0 or 2
            if(i >= actualPosRange.first and i <= actualPosRange.second)
                return nums1[mid];
            else if(i < actualPosRange.second)
                e = mid - 1;
            else
                s = mid + 1;
        }
        // search in second array
        s = 0; e = nums2.size() - 1;
        while(s <= e) {
            int mid = s + (e - s)/2;
            pair<int, int> actualPosRange = {mid + (lower_bound(nums1.begin(), nums1.end(), nums2[mid]) - nums1.begin()), mid + (upper_bound(nums1.begin(), nums1.end(), nums2[mid]) - nums1.begin())};
            //cout << format("mid: {}, [{}, {}]\n", mid, actualPosRange.first, actualPosRange.second);
            if(i >= actualPosRange.first and i <= actualPosRange.second)
                return nums2[mid];
            else if(i < actualPosRange.second)
                e = mid - 1;
            else
                s = mid + 1;
        }
        return -1;
    }
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        const int M = nums1.size(), N = nums2.size();
        double median = 0;
        if((M + N) & 1) {
            median = findIndex((M + N - 1)/2, nums1, nums2);
        } else {
            cout << findIndex((M + N)/2, nums1, nums2) << ',' << findIndex((M + N)/2 - 1, nums1, nums2);
            median = (findIndex((M + N)/2, nums1, nums2) + findIndex((M + N)/2 - 1, nums1, nums2))/2.0;
        }
        return median;
    }
};
```


**Time Complexity:** $O(\log(M) \cdot \log(N))$
**Space Complexity**: $O(1)$

## Approach : 4 slicing binary search

![[Median of Two Sorted Arrays 2026-03-21 17.46.55.excalidraw|1000]]

There is a pretty good writeup in the above image. Basically we need to determine if the cut was valid.

The first part is done i.e. the number of elements in both halves must be same.

For the second part we need to prove every element in left half is smaller than every element in right half. This can be done efficiently using the 4 terms $L_1, L_2, L_3$ and  $L4
