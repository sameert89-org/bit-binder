#needcode150 #binary-search 

[Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // first search in rows, this can be done by using a lower bound/upper bound on the first column
        const int R = matrix.size(), C = matrix[0].size();
        int s = 0, e = R - 1;
        int row = e + 1;
        // ub
        while(s <= e) {
            int mid = s + (e - s) / 2;
            if(matrix[mid][0] > target) {
                row = mid; // potential answer
                e = mid - 1;
            } else {
                s = mid + 1;
            }
        }
        row--;
        if(row < 0) return false;

        // now search in that row
        s = 0; e = C - 1;
        while(s <= e) {
            int mid = s + (e - s) / 2;
            if(matrix[row][mid] == target)
                return true;
            else if(target > matrix[row][mid])
                s = mid + 1;
            else
                e = mid - 1;
        }

        return false;
    }
};
```