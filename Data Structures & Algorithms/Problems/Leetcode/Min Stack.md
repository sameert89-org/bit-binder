#needcode150 #stack 

Problem Link: https://leetcode.com/problems/min-stack/description/

The bruteforce way of doing this would be for the min call you traverse the stack and get the min element each time.

The main problem that arises is what if I pop the minimum element, then I need to know the next element and this creates the false pretense of having to store every number that you know of.

But that is not the case, you need to realize that you only need to store every minimum number seen at a point of time. If I get a minimum number that is smaller than my current minimum then and only then its worth storing.

Why? Lets suppose you store a larger number as well, will this larger number ever be a minim

```cpp
class MinStack {
public:
    stack<int> base;
    stack<int> minimums;
    int mn;
    MinStack() {
        base = stack<int>();
        minimums = stack<int>();
        mn = INT_MAX;
    }
    
    void push(int val) {
        base.push(val);
        if(val <= mn) {
            mn = val;
            minimums.push(val);
        }
    }
    
    void pop() {
        int popped = base.top();
        base.pop();
        if(popped == mn) {
            minimums.pop();
            if(minimums.empty()) {
                mn = INT_MAX;
            } else {
                mn = minimums.top();
            }
        }
    }
    
    int top() {
        return base.top();
    }
    
    int getMin() {
        return mn;
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```