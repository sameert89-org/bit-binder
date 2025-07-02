#trees #hard
This is a followup of the return lexicographically sorted list of natural numbers up to n. There you could just sort it by converting each number to string, but the restraint was to do it in $O(N)$ time.

I wrote a method to just do that, bascially a next method that will tell what the next number will be given a current number. The implementation of the next function is below

```python
def next(curr: int, n: int) -> int:
	if next * 10 <= n:
		return next * 10
	else:
		while next % 10 == 9 and next + 1 > n:
			next //= 10
		return next + 1
```

But this followup question presents a maximum length of $10^9$ making it impossible to do it in O(N).

The idea to solve this problem is to look at how the numbers are arranged in 2D, below drawing shows a careful observation for a given range.

![[Drawing 2024-09-24 12.07.37.excalidraw]]

We see an binary tree structure that is being followed here, we only need to figure out a way to traverse to the branch which has our kth number.

To get the subtree for each number we append the digits $(0, 9)$ to the number. Let's analyse the number of elements in each level of this tree.

| Level | Elements |
| ----- | -------- |
| 1     | $9$      |
| 2     | $9^2$    |
| 3     | $9^3$    |
Clearly for getting the lexicographical order we need to perform preorder traversal of this tree.
It will be beneficial to identify which level will given number fall in:

Say N = 13, the leftmost leaf will be 10