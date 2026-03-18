#stack #neetcode150 

Problem Link: https://neetcode.io/problems/validate-parentheses/question?list=neetcode150

The approach is simple, using a stack, like most of the expression validation problems:

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> brackets = {
            {')', '('},
            {']', '['},
            {'}', '{'}
        };

        for (char ch : s) {
            if (brackets.count(ch)) {
                if (st.empty() || st.top() != brackets[ch]) return false;
                st.pop();
            } 
            else {
                st.push(ch);
            }
        }
        
        return st.empty();
    }
};
```