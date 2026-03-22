#needcode150 #sliding_window 

Problem Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/1945822746/

The straightforward bruteforce approach is to generate all substrings and check them.

The optimal solution is to use sliding window and a map, I continue growing my window until I find a character I have already *seen*, since I want to process the remaining elements I have to remove the other occurence from the left.

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