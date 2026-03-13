#needcode150 #sliding_window 

Problem Link: https://leetcode.com/problems/longest-repeating-character-replacement/

The first approach that comes to mind is to use bruteforce to generate all substrings and for each substring count the frequency of the alphabets. There will be one substring for alphabet X with length Cx + K, where Cx is the count of X in the substring, replacing K elements in this substring will yield the result.

This results in an $O(N^2)$ algorithm with linear space.

This can be solved similar to [[Longest Substring Without Repeating Characters]] 

For each alphabet that appears in `str` I will run a sliding window over the string, the window keeps adding the current number as long as I keep seeing it, as soon as I see another number I need to replace it, I only have *k* replaces, as soon as I run out of replaces I must shrink my window from the left to grant me more replaces.

![[Longest Repeating Character Replacement 2026-03-13 17.37.33.excalidraw]]

```cpp
#include<format>
class Solution {
public:
    int longestForChar(char ch, const string &s, const int &k) {
        int wStart = 0, wEnd = 0, n = s.size(), non_ch_count = 0, result = 1;
        while(wEnd < n) {
            if(s[wEnd] != ch) {
                non_ch_count++;
                while(non_ch_count > k) {
                    if(s[wStart] != ch) {
                        non_ch_count--;
                    }
                    wStart++;
                }
            }
            wEnd++;
            result = max(result, wEnd - wStart);
        }
        return result; 
    }
    int characterReplacement(string s, int k) {
        set<char> alphabets(s.begin(), s.end());
        int result = 1;
        for(auto it = alphabets.begin(); it != alphabets.end(); it++) {
            result = max(result, longestForChar(*it, s, k));
        }
        return result;
    }
};
```

This has the worst case time complexity of $O(26*n)$.  To further optimize this, we need to arrive at the following observation:

> A window is valid as long as `window_size - most_frequent_element_count <= k`

