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

![[Median of Two Sorted Arrays 2026-03-21 17.46.55.excalidraw]]

There is a pretty good writeup in the above image. Basically we need to determine if the cut was valid.

The first part is done i.e. the number of elements in both halves must be same.

For the second part we need to prove every element in left half is smaller than or equal to every element in right half. This can be done efficiently using the 4 terms $L_1, L_2, R_1$ and  $R2$ 

We already know that arrays are sorted hence:
1. $L_1 \leq R_1$
2. $L_2 \leq R_2$

So the main thing left to check is:

1. $L_1 \leq R_2$
2. $L_2 \leq R_1$ 

 If `1` is violated means R2 is too big, we need to shrink the cut.
 If `2` is violated that means L2 is too small, we need to expand the cut. 

Why am I doing it via second array only, because its smaller, and doesn't cause out of bounds on Array 1.

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        const int M = nums1.size(), N = nums2.size();

        if(M > N) return findMedianSortedArrays(nums2, nums1);
        
        int s = 0, e = M; // since all elements can be part of L1 or none can be part of L1
        // cut runs in the gaps between the elements |0|1|2|3|..|M - 1| these '|' are cut positions cut at X means
        // every element from 0 to X excluding X, cut at 0 means exlude 0 so "", cut at M means 0 to M - 1

        const int ELEMENTS_TILL_MEDIAN = (M + N + 1) / 2; // for even numbers 1,2,3,4 elements till mendian are
        // 1 and 2 = 5/2 and for odd 1,2,3,4,5 6/2 = 3, TILL means including median, this general formula works for both even and odd

        while(s <= e) {
            int cut1 = s + (e - s) / 2; // mid
            int cut2 = ELEMENTS_TILL_MEDIAN - cut1;

            int L1 = cut1 == 0 ? INT_MIN : nums1[cut1 - 1];
            int R1 = cut1 == M ? INT_MAX : nums1[cut1];
            int L2 = cut2 == 0 ? INT_MIN : nums2[cut2 - 1];
            int R2 = cut2 == N ? INT_MAX : nums2[cut2];

            if(L1 <= R2 and L2 <= R1) {
                if((M + N) & 1)
                    return max(L1, L2);
                return (max(L1, L2) + min(R1, R2)) / 2.0;
            } else if(L1 > R2) {
                e = cut1 - 1;
            } else {
                s = cut1 + 1;
            }
        }

        return 0.0; // should not reach here
    }
};
```

**Time Complexity:** $O(log(min(M, N)))$
**Space Complexity**: $O(1)$
