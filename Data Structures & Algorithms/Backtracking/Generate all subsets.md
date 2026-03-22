#backtracking #recursions #bitwise 
This is a classic backtracking problem where you are tasked to generate all subsets of a given array aka *powerset*

The approach is to use a decision tree (similar to top down #dp problems)

Below is the decision tree for simple 3 element domain.

![[Generate all subsets 2026-03-04 14.36.14.excalidraw]]

Implementation follows

```python
def print_subsets(arr, i, curr_subset):
    if i == len(arr):
        print(curr_subset)
        return

    # Option 1: exclude arr[i]
    print_subsets(arr, i + 1, curr_subset)

    # Option 2: include arr[i]
    curr_subset.append(arr[i])
    print_subsets(arr, i + 1, curr_subset)
    
    # Backtrack: remove the element so it doesn't stay in the list for other branches
    curr_subset.pop()

print_subsets([1, 2, 3], 0, [])
```

There is also an interesting bitwise solution to this problem. If we observe the first 8 numbers from 0-7 in binary we see an interesting pattern.

*Note: Why only 8? because the power set of a 3 element array is going to have $2^n$ elements. *

| Number | Binary Value |
| ------ | ------------ |
| 0      | 000          |
| 1      | 001          |
| 2      | 010          |
| 3      | 011          |
| 4      | 100          |
| 5      | 101          |
| 6      | 110          |
| 7      | 111          |
The binary value is unique, if we use it to pick or not pick the numbers (1 for picking and 0 for not picking) then we can see the subsets being formed. We can loop over these numbers and use them as a mask to print subsets.