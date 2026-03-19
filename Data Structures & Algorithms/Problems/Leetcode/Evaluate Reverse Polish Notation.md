#needcode150  #stack 

Problem Link: leetcode.com/problems/evaluate-reverse-polish-notation/

Very intuitive using stacks.

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> eval;
        auto calc = [](int a, char op, int b) {
            switch(op) {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '*':
                    return a * b;
                case '/':
                    return a / b;
                
            }
            return -1;
        };

        unordered_set<char> operators = {'*', '+', '-', '/'};

        for(auto token: tokens) {
            if(token.size() == 1 and operators.contains(token[0])) { // negative numbers can also start with -, hence size check here
                int b = eval.top();
                eval.pop();
                int a = eval.top();
                eval.pop();
                eval.push(calc(a, token[0], b));
            }
            else
                eval.push(stoi(token));
        }
        return eval.top();
    }
};
```

