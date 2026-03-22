#needcode150  #sliding_window 

Problem Link: https://leetcode.com/problems/minimum-window-substring/description/

Same old same old, bruteforce all substrings check the smallest which has the frequency. Let's call the string to search in `haystack` and string to look for the `needle`.

An optimal approach is the use 2 frequency maps and a sliding window. First build the frequency map for the string we need to find. Then start growing the window. At each point grown you check whether the frequency map 2 has every element from 1 more than required times. If yes you try to shrink the window from the left. This can be done in $O(k\cdot n)$  where $k$ is the number of unique characters in `needle`.

You don't need to store the substring, that is one common cause of TLE instead optimally store first and last positions. I have done some python gymnastics in the below solution to get the empty string answer, but its better to keep it dumb.

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        f1 = Counter(t)
        s += "0"
        N = len(s)
        w_start = 0
        w_end = 0
        f2 = Counter()
        res = (len(s), 2*len(s) + 1)
        def isValid():
            for k in f1.keys():
                if f2[k] < f1[k]:
                    return False
            return True
        while w_end < N:
            f2[s[w_end]] += 1
            # while w_start is in abundance we shrink window
            while w_start < w_end and (s[w_start] not in f1 or f2[s[w_start]] > f1[s[w_start]]):
                f2[s[w_start]] -= 1
                w_start += 1
            if isValid() and res[1] - res[0] + 1 > w_end - w_start + 1:
                res = (w_start, w_end)
            w_end += 1
        
        return s[res[0]:res[1] + 1]
```

The optimization from here is to realize that we do not need to check isValid for all characters every time. Instead we can keep the 2 maps and track how many characters have met their requirement.


> [!NOTE] The validity Check
> I am doing 2 part validity check in above solution, first part shrinks the window for only those character that are either not present in `f1` or have values greater than required. This does not cover all keys in `f1` hence I need another validity check in the result calculation. The second solution exploits this by maintaining the `formed` this is the check that tells me whether all the keys are satisified or not. 


```python
from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not t or not s: return ""

        dict_t = Counter(t)
        required = len(dict_t)
        window_counts = {}
        formed = 0
        l = 0
        ans = float("inf"), None, None

        for r in range(len(s)):
            char = s[r]
            window_counts[char] = window_counts.get(char, 0) + 1

            if char in dict_t and window_counts[char] == dict_t[char]:
                formed += 1

            # if valid try to shrink
            if formed == required:
                # if we do below then that means l is safe to remove
                
                while l <= r and (s[l] not in dict_t or window_counts[s[l]] > dict_t[s[l]]):
                    window_counts[s[l]] -= 1
                    l += 1
                
                # record the result
                if r - l + 1 < ans[0]:
                    ans = (r - l + 1, l, r)
        
        return "" if ans[0] == float("inf") else s[ans[1] : ans[2] + 1]
```