Knuth Morris Pratt algorithm is used to find the first occurrence of a substring in a string in O(N + M) time.

The core intuition behind this algorithm is that everytime we find a mismatch during our linear search we again go back to the substrings beginning and match it again that results in O(M\*N) complexity in the worst case.

## LPS Array
We maintain an LPS (Longest prefix suffix) array. For each index i in the substring the LPS stores how many characters match from the beginning. In other words it is the longest prefix that is a suffix of the substring of the substring ending at that index.

![[Drawing 2023-10-14 17.22.00.excalidraw]]

This helps us avoid the repeated going back and only go back the necessary amount. suppose we have matched till the second b then we go back only two characters and match from c now because a and b are already matched.

```python
# KMP
def createLPS(substring):
	M = len(substring)
	lps = [0] * M
	j, i = 0, 1
	while i < M:
		if substring[i] != substring[j]:
			j -= lps[i - 1]
		if substring[i] == substring[j]:
			lps[i] = j + 1
			j += 1
		i += 1
	return lps
```

## Algorithm
The algorithm is as follows:
Start matching normally using two pointers, everytime there is a mismatch instead of resetting the substring pointer to 0, set it to `lps[j - 1]`

```python
def find(st, sub, lps):
	M, N = len(sub), len(st)
	i, j = 0, 0
	while i < N:
		if st[i] == sub[j]:
			i += 1; j += 1
			if j == M:
				return i - j
		else:
			if j != 0: j = lps[j - 1]
			else: i += 1
	return -1
```

## Related problems
Leetcode: Smallest prefix to make given string palindromic.