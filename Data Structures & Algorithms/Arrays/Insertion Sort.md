#algorithms #sorting 


> [!hint] Intuition
> *We think of array being devided into 2 parts, sorted | unsorted. The first element is assumed to be sorted, that's where we draw the initial boundary. Start from the second element compare with first, if smaller swap them, now our sorted boundary is moved to after second element. Take the third element, compare with first 2 elements, then put it in its right position if smaller, by shifting the array elements to make space for it* 

## Implementation
```python
def insertion_sort(numbers):
    sorted_upto = 1

    while sorted_upto < len(numbers):
        current_value = numbers[sorted_upto]
        position = sorted_upto

        # Move elements that are bigger to the right
        while position > 0 and numbers[position - 1] > current_value:
            numbers[position] = numbers[position - 1]
            position = position - 1

        numbers[position] = current_value
        sorted_upto = sorted_upto + 1
```