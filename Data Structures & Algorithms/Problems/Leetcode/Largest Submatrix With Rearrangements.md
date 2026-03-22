#daily_challenge 
2026-03-18

Problem Link : https://leetcode.com/problems/largest-submatrix-with-rearrangements/submissions/?envType=daily-question&envId=2026-03-17

My first thought process was something like cp150 overlapping intervals, if I treat all the 1 consecutive groups in each column as an interval I could calculate the number of overlapping ones, but that would fail since each column could have more than 1 of such intervals.

I tried to think towards bitwise since it was a binary matrix, but the sizes of the matrix were very large and hence the number of bits would be to.

Third Idea I though of was somehow summing the columns together and try to come up with a pattern. This would also fail since if you see a group of 2- 3s that does not mean you have 2 intervals of 3 consecutive overlapping ones that created it, it could also mean one was created with 3 different columns having 1's at one of the 3 places.

The key idea here is to realize that since the rearrangement is allowed, the order of columns does not matter, Some kind of sorting is involved since I want the largest square.


How do I efficiently find the areas of the squares?

Calculating prefix-sum at each point which tells me the area till that position in that column. then I see towards the right if I have any prefix sum in other columns which is atleast this.

```cpp
class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& matrix) {
        // need to find the maximum overlap between all 1 islands
        int R = matrix.size(), C = matrix[0].size();
        vector<vector<int>> consecOrder(R, vector<int>(C, 0));
        // store consecutive ones ending at each position
        for(int j = 0; j < C; j++) {
            int consecOnes = 0;
            for(int i = 0; i < R; i++) {
                if(matrix[i][j] == 1) {
                    consecOnes += 1;
                } else {
                    consecOnes = 0;
                }
                consecOrder[i][j] = consecOnes;
            }
        }

        // sort the arrays
        for(auto &row: consecOrder) {
            sort(row.begin(), row.end(), greater<int>());
        }

        // iterate over the matrix and process each row for maximum
        // I move right and keep track of my maximum, since the area formed by using that particular column's position as ending position would be length * height of that consecqutive 1 sequence. the length is all the cells which have the same or larger height than this, since we have reverse sorted the array we can see that this is effectively all the cells we have already passed while iterating, anything after here would be smaller and hence cannot be included with the submatrix formed by current column which ends at current index
        int maximum = INT_MIN;
        for(int i = 0; i < R; i++) { 
            for(int j = 0; j < C; j++) {
                maximum = max(maximum, consecOrder[i][j] * (j + 1));
            }
        }

        return maximum;
    }
};
```