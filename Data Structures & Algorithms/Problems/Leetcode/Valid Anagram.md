#neetcode150 #arrays #hashing 

Problem Link: https://leetcode.com/problems/valid-anagram/description/

This is another simple question which can be solved either via a hashmap i.e. frequency counting or using a sorting method like [[Contains Duplicate]]

```cpp
class Solution {

public:

    bool isAnagram(string s, string t) {

        if(s.size() != t.size())

            return false;

        sort(s.begin(), s.end());

        sort(t.begin(), t.end());

        for(int i = 0; i < s.size(); i++){

            if(s[i] != t[i])

                return false;

        }

        return true;

    }

};