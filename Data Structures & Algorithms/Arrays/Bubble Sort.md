#algorithms #sorting 


> [!hint] Intuition
> *I start by taking the first element, I compare it with immediate next element, if its larger I swap them. I go till the end. I again start from the first element, I keep compare-swapping it to its neighbours until end-1 this time*


## Implementation

```python
def bubble_sort(arr):
	for end in range(len(arr) - 1, 0, -1):
		for i in range(0, end):
			if arr[i] > arr[i+1]:
				arr[i], arr[i+1] = arr[i+1], arr[i]	
```