#needcode150 #monotonic_ds  #stack 

Problem Link: 

![[Max  Rectangle in Histogram 2026-03-19 20.21.11.excalidraw]]

From the above analysis in the image (Although I have fucked up the equation of area calculation, specifically the index range) tells us that the maxArea which a tower `i` is part of can be written as:
`maxArea(i) = height(i) * (1 + total contiguous towers left of i which  have height >= height(i) + total contiguous towers right of i which have height >= height(i)`

This can be efficiently calculated using stacks (see the blue part in the image)

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        const int N = heights.size();
        stack<int> st; // monotonic stack
        vector<int> smallerTowardsLeft(N), smallerTowardsRight(N);
        for(int i = 0; i < N; i++) {
            while(!st.empty() and heights[st.top()] >= heights[i])
                st.pop();
            if(st.empty()){
                smallerTowardsLeft[i] = -1;
            } else {
                smallerTowardsLeft[i] = st.top();
            }
            st.push(i);
        }

        while(!st.empty())
            st.pop();

        for(int i = N - 1; i > -1; i--) {
            while(!st.empty() and heights[st.top()] >= heights[i])
                st.pop();
            if(st.empty()){
                smallerTowardsRight[i] = N;
            } else {
                smallerTowardsRight[i] = st.top();
            }
            st.push(i);
        }

        // calculate the maxArea
        int maxArea = INT_MIN;

        for(int i = 0; i < N; i++) {
            cout << smallerTowardsLeft[i] << "," << smallerTowardsRight[i] << endl; 
            maxArea = max(maxArea, heights[i] * (smallerTowardsRight[i] - smallerTowardsLeft[i] - 1));
        }

        return maxArea;
    }
};
```