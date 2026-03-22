#daily_challenge 
2026-03-16

This is just an implementation heavy problem, it took me 1 hour, I kept wanting to keep it clean since yesterda's trauma is still with me. Check out [[Fancy Sequence]] to know what I mean.


```cpp
#include<format>
class Solution {
public:
    void updateResult(vector<int> &result, int val) { // poor man's sorted set
        // 1. Find the first element >= val
        auto it = lower_bound(result.begin(), result.end(), val);
    
        // 2. Duplicate check: If val is already in the vector, do nothing
        if (it != result.end() && *it == val) {
            return;
        }
    
        // 3. If vector is not full yet, just insert in the sorted position
        if (result.size() < 3) {
            result.insert(it, val);
        } 
        // 4. If full, only insert if it's larger than the smallest element
        else if (val > result[0]) {
            result.insert(it, val);   // Insert in sorted order
            result.erase(result.begin()); // Remove the old smallest
        }
    }
    bool inBounds(int i, int j, const vector<vector<int>> &grid) {
        return i < grid.size() && j < grid[0].size();
    }
    void solveForPeak(int i, int j, vector<int> &result, const vector<vector<int>> &grid) {
        updateResult(result, grid[i][j]); // single cell is also a rhombus according to the problem
        int side = 1;
        while(inBounds(i + side, j - side, grid) and inBounds(i + side, j + side, grid) && inBounds(i + 2*side, j, grid)) {
            int area = grid[i][j] + grid[i + 2*side][j]; // top and bottom edges
            for(int x = 1; x <= side; x++) {
                area += grid[i + x][j - x] + grid[i + x][j + x]; // guaranteed to be in bounds due to outer while
                if(side != x) // i + 2 * side - x != i + x avoid double counting the horizontal extremes
                    area += grid[i + 2 * side - x][j - x] + grid[i + 2 * side - x][j + x];
            }
            cout << area << endl;
            updateResult(result, area);
            side++;
        }
    }
    vector<int> getBiggestThree(vector<vector<int>>& grid) {
        // take each point as peak in row-wise traversal and calculate the max areas
        vector<int> result;
        int R = grid.size(), C = grid[0].size();

        for(int i = 0; i < R; i++) {
            for(int j = 0; j < C; j++){
                solveForPeak(i, j, result, grid);
            }
        }
        reverse(result.begin(), result.end());
        return result;
    }
};
```

The constraints are small enough so I knew it was one of those spiral traversal/valid sudoku problems.

![[Get Biggest Three Rhombus Sums in a Grid 2026-03-16 13.46.46.excalidraw]]