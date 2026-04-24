#needcode150 #sorting #heaps 

This is a straightforward sorting problem, but the question asks us explicitly to do better than that.

A min heap can be used to repeatedly extract the minimum element in O(log n) time per extraction.

```cpp
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        min_heap = []

        for num in nums:
            heapq.heappush(min_heap, num)
            if len(min_heap) > k:
                heapq.heappop(min_heap)
        
        return min_heap[0]
```