#neetcode150 #arrays #hashing 

Problem Link: https://leetcode.com/problems/valid-sudoku/description/

This is very straightforward traversal problem. You have 3 parts to validate.

1. Each row must contain the digits `1-9` without repetition.
2. Each column must contain the digits `1-9` without repetition.
3. Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
       // validate each row and column
       // due to symmetric nature of the traversal of sudoku we can do it in 1 traversal
       for(int i = 0; i < 9; i++){
        unordered_set<int> row_nums, col_nums;
        for(int j = 0; j < 9; j++){
            if(board[i][j] != '.' && row_nums.find(board[i][j]) != row_nums.end())
                return false;
            row_nums.insert(board[i][j]);
            if(board[j][i] != '.' && col_nums.find(board[j][i]) != col_nums.end())
                return false;
            col_nums.insert(board[j][i]);
        }
       }
       // validate the 3x3 cells
       for(int cellr = 0; cellr < 3; cellr++){
        for(int cellc = 0; cellc < 3; cellc++){
            unordered_set<int> cell_nums;
            for(int i = cellr * 3; i < cellr * 3 + 3; i++){
                for(int j = cellc * 3; j < cellc * 3 + 3; j++){
                    if(board[i][j] != '.' && cell_nums.find(board[i][j]) != cell_nums.end())
                        return false;
                    cell_nums.insert(board[i][j]);
                }
            }
        }
       }
       return true;
    }
};
```

The only part is the frigging implementation, be logical and write shit down :).