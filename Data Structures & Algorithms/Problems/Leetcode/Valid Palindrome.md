#neetcode150  #strings #two-pointers 

Problem Link: https://leetcode.com/problems/valid-palindrome/

Bruteforce this by creating a copy, reversing it and checking the string.

Optimize it by using two pointers, the string is symmetric 

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int i = 0, j = s.size() - 1;
        while(i < j){
            if(!isalnum(s[i])){
                i++;
                continue;
            }
            if(!isalnum(s[j])){
                j--;
                continue;
            }
            if(tolower(s[i]) != tolower(s[j]))
                return false;
            i++; j--;
        }
        return true;
    }
};
```