#daily_challenge #matrix
2026-03-22

Problem Link: [Determine Whether Matrix Can Be Obtained By Rotation](https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/)

This is a good problem, even though its marked easy. The two core things to learn out of this problem are how to do matrix rotations in place and how to check the rotations without actually doing rotation.

![[Determine Whether Matrix Can be Obtained By Rotation 2026-03-22 12.11.07.excalidraw|800]]

From the above image we can observe that rotation follows a pattern in i, j. The easiest to visualize is the $90\deg$ rotation,  Then other equations can be found by using again rotating by rotating the 90 degree coordinates by 90 degree.

Even though not needed for this question, an interesting thing about 90 degree rotation is its relation with *transpose*.


> [!INFO] Matrix Transpose
> Tranpose of a square matrix  is a matrix obtained by swapping its rows and columns, effectively flipping it over its main diagonal

The 90 degree rotation is just matrix transpose -> reveresed rows.

```cpp
class Solution {
public:
    // rotates a given matrix by 90 degrees
    void rotate(vector<vector<int>> &mat){
        const int N = mat.size();
        vector<vector<int>> temp(N, vector<int>(N));
        // first column becomes first row in reverse
        // second column becomes second row in reverse, and so on...
        for(int i = 0; i < N; i++) {
            for(int j = 0; j < N; j++){
                temp[N - j - 1][i] = mat[i][j];
            }
        }
        mat = temp;
    }
    bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {
        // Rotate the matrix and check for each
        const int N = mat.size();
        for(int rot = 0; rot < 4; rot++) {
            bool equal = true;
            for(int i = 0; i < N; i++) {
                for(int j = 0; j < N; j++) {
                    if(mat[i][j] != target[i][j]){
                        equal = false;
                        break;
                    }
                }
            }
            if(equal)
                return true;
			if(rot == 3) break;
            rotate(mat);
        }
        return false;
    }
};
```

```cpp
class Solution {
public:
    // rotates a given matrix by 90 degrees
    void rotate(vector<vector<int>> &mat){
        const int N = mat.size();
        // transpose then reverse rows
        for(int i = 0; i < N; i++) {
            for(int j = i + 1; j < N; j++){ // i + 1 to avoid re-swapping i.e you swap 0,1 with 1,0 but next time you dont want to swap 1,0 with 0,1 nullifying the swap
                swap(mat[i][j], mat[j][i]);
            }
        }
        for(auto &row: mat)
            reverse(row.begin(), row.end());
    }
    bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {
        // Rotate the matrix and check for each
        const int N = mat.size();
        for(int rot = 0; rot < 4; rot++) {
            bool equal = true;
            for(int i = 0; i < N; i++) {
                for(int j = 0; j < N; j++) {
                    if(mat[i][j] != target[i][j]){
                        equal = false;
                        break;
                    }
                }
            }
            if(equal)
                return true;
			if(rot == 3) break;
            rotate(mat);
        }
        return false;
    }
};
```

```python
class Solution:
    def findRotation(self, mat: List[List[int]], target: List[List[int]]) -> bool:
        N = len(mat)
        matches = [True, True, True, True] # track the match for 0, 90, 180 & 270 rotations
        for i in range(N): 
            for j in range(N):
                matches[0] &= target[i][j] == mat[i][j]
                matches[1] &= target[i][j] == mat[N-j-1][i]
                matches[2] &= target[i][j] == mat[N-i-1][N-j-1]
                matches[3] &= target[i][j] == mat[j][N-i-1]

        return any(matches)
```