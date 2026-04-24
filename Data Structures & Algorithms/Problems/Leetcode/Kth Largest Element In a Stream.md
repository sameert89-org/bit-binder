#needcode150 #heaps 

The bruteforce approach is using insertion sort, you can store the whole stream and perform insertion sort on the stream.

But this results in $O(N^2)$ Complexity. The optimal approach is to use a min-heap, which sounds counter-intuitive at first since we are being asked for the largest element.

But think of it this way, on a K sized min-heap the kth largest element will be the smallest element in the heap.

```python 
class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        self.minHeap = []
        self.k = k
        for num in nums:
            heapq.heappush(self.minHeap, num)
            if len(self.minHeap) > k:
                heapq.heappop(self.minHeap)

    def add(self, val: int) -> int:
        heapq.heappush(self.minHeap, val)
        
        if len(self.minHeap) > self.k:
            heapq.heappop(self.minHeap)
            
        return self.minHeap[0]
```