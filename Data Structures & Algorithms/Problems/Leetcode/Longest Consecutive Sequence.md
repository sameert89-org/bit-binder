#neetcode150  #arrays  #hashing 

Problem Link: https://leetcode.com/problems/longest-consecutive-sequence/description/

The simplest solution that comes to mind is using sorting, and then checking the contiguous elements in a linear manner, but this problem puts the constraint that you have to do it in linear time.

The hashing approach comes to mind next, there is only so many contiguous sets, and for a contiguous set I can predict the previous and the next number (they would simply be `curr - 1` and `curr + 1`), I create a map and check whether I have curr - 1 or curr + 1 in the map, if yes then I increment that sequences contiguo