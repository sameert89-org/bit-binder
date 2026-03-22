#daily_challenge 
2026-03-21

This one is pretty straightforward, as always I cannot read and flipped the columns instead of rows.

```cpp
class Solution {
public:
    vector<vector<int>> reverseSubmatrix(vector<vector<int>>& grid, int x, int y, int k) {
        for(int j = y; j < y + k; j++) {
            int t = x, b = x + k - 1; // top bottom swap
            while(t < b) {
                swap(grid[t][j], grid[b][j]);
                t++;
                b--;
            }
        }

        return grid;
    }
};
```