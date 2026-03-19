#daily_challenge 
2026-03-19

This is very similar to yesterday's problem [[Count Submatrices with Top-Left Element and Sum Less Than Equal to k]]

The only difference is that it has char's, I tried using an efficient way to counting X and Y, by incrementing X for each encounterd and decrementing for each `Y` encountered. And trying to store back in the grid, but the char would limit out, even though signed char can store positive and negative numbers, its very short in range.

```cpp
class Solution {
public:
    int numberOfSubmatrices(vector<vector<char>>& grid) {
        // prefix sum + scan left
        int R = grid.size(), C = grid[0].size();
        vector<vector<pair<int, int>>> counts(R, vector<pair<int, int>>(C, {0, 0}));
        for(int j = 0; j < C; j++) {
            int prevX = 0, prevY = 0;
            for(int i = 0; i < R; i++) {
                char ch = grid[i][j];
                if(ch == 'X') {
                    prevX += 1;
                } else if (ch == 'Y') {
                    prevY += 1;
                }
                counts[i][j].first = prevX;
                counts[i][j].second = prevY;
            }
        }
        int result = 0;
        // scan left
        for(int i = 0; i < R; i++) {
            int prevX = 0, prevY = 0;
            for(int j = 0; j < C; j++) {
                prevX += counts[i][j].first;
                prevY += counts[i][j].second;
                if(prevX > 0 and prevX == prevY)
                    result++;
            }
        }
        return result;
    }
};
```