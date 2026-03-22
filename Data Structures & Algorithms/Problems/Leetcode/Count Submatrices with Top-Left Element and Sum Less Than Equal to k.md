#daily_challenge 
2026-03-18

Problem Link: https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/?envType=daily-question&envId=2026-03-18

This problem I was able to solve since I did yesterday's problem: [[Largest Submatrix With Rearrangements]]

The idea is similar using a prefix sum, following drawing clears it up

![[Count Submatrices with Top-Left Element and Sum Less Than Equal to k 2026-03-18 18.19.44.excalidraw]]

```cpp
class Solution {
public:
    int countSubmatrices(vector<vector<int>>& grid, int k) {
        // calculate prefix sum columnwise
        const int R = grid.size(), C = grid[0].size();
        for(int j = 0; j < C; j++) {
            int prevSum = 0;
            for(int i = 0; i < R; i++) {
                grid[i][j] += prevSum;
                prevSum = grid[i][j];
            }
        }

        int result = 0;
        // scan left for each added row
        for(int i = 0; i < R; i++) {
            int currSum = 0;
            for(int j = 0; j < C; j++) {
                currSum += grid[i][j];
                if (currSum > k)
                    break;
                result++;
            }
        }

        return result;
    }
};
```