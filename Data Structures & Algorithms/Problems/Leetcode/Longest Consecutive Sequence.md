#neetcode150  #arrays  #hashing 

Problem Link: https://leetcode.com/problems/longest-consecutive-sequence/description/

The simplest solution that comes to mind is using sorting, and then checking the contiguous elements in a linear manner, but this problem puts the constraint that you have to do it in linear time.

The hashing approach comes to mind next, I can hash whatever elements are present in a map, then I can run a dfs from each element to find the length.

![[Longest Consecutive Sequence 2026-03-09 21.50.32.excalidraw]]

