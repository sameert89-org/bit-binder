#needcode150  #sliding_window 

Problem Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/

The straight forward approach is to generate all substrings, check which are not having repeating characters, then return the longest substring. This results in an $O(N^2)$ algorithm.

An optimized approach will be to use sliding window, I start my window only having the first element, I grow my window towards right.

I am also maintaining a frequency map while doing this. As soon as my window sees a repeated frequency, I pop from the left till I have fixed my frequency problem. I keep calculating the maximum substring at these breakpoints.

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
		if(s == "") return 0;
        int wStart{}, wEnd{}, N = s.size(), result{1};
        unordered_set<int> seen;
        while(wEnd < N){
            if(seen.find(s[wEnd]) != seen.end()){
				result = max(result, wEnd - wStart);
				cout << format("wStart: {}, wEnd: {} ", wStart, wEnd);
                while(s[wStart] != s[wEnd]){
					seen.erase(s[wStart]);
					wStart++;
                }
				seen.erase(s[wStart]);
                wStart++;
            }
			seen.insert(s[wEnd]); 
			wEnd++;
        }
		return max(result, wEnd - wStart);
    }
};
```