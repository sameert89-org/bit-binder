#needcode150 #sliding_window 

Problem Link: https://leetcode.com/problems/permutation-in-string/description/

The bruteforce solution is to generate all permutations of the given string and check if each permutation is a substring or not. This results in an $O(n!)$ time complexity and linear space complexity.

However this can be done using frequency counting and a sliding window

![[Permutation in String 2026-03-13 19.28.43.excalidraw]]

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        N1, N2 = len(s1), len(s2)
        if N1 > N2:
            return False

        f1 = Counter(s1)
        w_start = 0
        w_end = N1 - 1
        
        f2 = Counter(s2[w_start:w_end + 1]) 

        def match():
            return all(f1[x] == f2[x] for x in f1.keys())

        while w_end < N2 - 1:
            if match():
                return True
            f2[s2[w_start]] -= 1
            w_start += 1
            w_end += 1
            f2[s2[w_end]] += 1 
    
        return match()
```