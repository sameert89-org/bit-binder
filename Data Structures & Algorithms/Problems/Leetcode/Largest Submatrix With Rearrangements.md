#daily_challenge 
2026-03-18

Problem Link : https://leetcode.com/problems/largest-submatrix-with-rearrangements/submissions/?envType=daily-question&envId=2026-03-17

My first thought process was something like cp150 overlapping intervals, if I treat all the 1 consecutive groups in each column as an interval I could calculate the number of overlapping ones, but that would fail since each column could have more than 1 of such intervals.

I tried to think towards bitwise since it was a binary matrix, but the sizes of the matrix were very large and hence the number of bits would be to.

Third Idea I though of was 