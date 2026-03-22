#sliding_window #hashing #arrays

**Difficulty:** Medium-Hard
## Problem Statement

You are given a **0-indexed** integer array `nums` and an integer `k`.

A subarray is called **equal** if all of its elements are equal. Note that the empty subarray is an **equal** subarray.

Return _the length of the **longest** possible equal subarray after deleting **at most**_ `k` _elements from_ `nums`.

A **subarray** is a contiguous, possibly empty sequence of elements within an array.

**Example 1:**

**Input:** nums = \[1,3,2,3,1,3], k = 3
**Output:** 3
**Explanation:** It's optimal to delete the elements at index 2 and index 4.
After deleting them, nums becomes equal to [1, 3, 3, 3].
The longest equal subarray starts at i = 1 and ends at j = 3 with length equal to 3.
It can be proven that no longer equal subarrays can be created.

**Example 2:**

**Input:** nums = \[1,1,2,2,1,1], k = 2
**Output:** 4
**Explanation:** It's optimal to delete the elements at index 2 and index 3.
After deleting them, nums becomes equal to [1, 1, 1, 1].
The array itself is an equal subarray, so the answer is 4.
It can be proven that no longer equal subarrays can be created.

## Approach
This problem seemed very easy at first, but was not able to solve it.

The approach #1 that came into my mind was using the gap method. I will store the indices of each occurrence of a number and then try to find out if I can bridge the gap between them using `k` items.

![[Drawing 2023-08-20 14.07.38.excalidraw]]

I would do it for each of the numbers and try to find the maximum of it. 

What I had trouble thinking is the edge cases that I might get stuck on. If I bridged the gap once, I have to reconsider the possibility of having a longer thing after this that may include some of the nodes from the current elements.

This was the logic that the top coders used to solve this problem as well. But they traversed all instances of the element and checked the longest possible thing from them. I did not think of this because I thought it would for sure cause TLE.

### Solution 1 (Index Map)
```python
class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        idx_map = defaultdict(list)
        max_len = 0
        for idx, num in enumerate(nums):
            idx_map[num].append(idx)
        print(idx_map)
        for v in idx_map.values():
            end = 0
            for i in range(len(v)):
                while end < len(v) and v[end] - v[i] - (end - i) <= k: end += 1
                max_len = max(max_len, end - i)
        return max_len
```

Things to understand:
1. `v[end] - v[i] - (end - i)` This calculates the gap between things

![[Drawing 2023-08-20 14.18.38.excalidraw]]

See the image, this statement handles then no gap and gap case to calculate the correct gap.
2. Why does it not cause TLE? Because end is not reinitialized before the for loop. So `i` will move forward with a fixed `end` after it was filled by a previous `i` and end will not increment or get to a longer thingy before we hit a gap which we can bridge.

#### Time & Space Complexities
O(N) Every element is visited thrice because of the index map creation and the traversal at the bottom. using i and end.
O(N) Due to the index map.

### Solution 2 (Sliding Window)
This was a tricky one, I definitely have less practice with sliding window so am terrible at identifying these problems.
The window tries to eat elements one by one towards the right. If it is eating one type of elements max_freq, it is going to be chilling. But if it eats some other element that is not max_freq, it will get a strike and after k strikes it is sick enough that it has to remove the element at the back. The affinity of this window is toward the most frequent element. This is the only dish that it can eat. But its affinity may change over the time if it eats way too much of B than A & B becomes the most_freq.

```python
class Solution:
    def longestEqualSubarray(self, A: List[int], k: int) -> int:
        maxf = i = 0
        count = Counter()
        for j in range(len(A)):
            count[A[j]] += 1
            maxf = max(maxf, count[A[j]])
            if j - i + 1 - maxf > k: # bad food = mouth - ass + 1 - good_food
                count[A[i]] -= 1
                i += 1
        return maxf
```