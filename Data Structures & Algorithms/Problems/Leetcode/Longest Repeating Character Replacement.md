#needcode150 #sliding_window 

Problem Link: https://leetcode.com/problems/longest-repeating-character-replacement/

The first approach that comes to mind is to use bruteforce to generate all substrings and for each substring count the frequency of the alphabets. There will be one substring for alphabet X with length Cx + K, where Cx is the count of X in the substring, replacing K elements in this substring will yield the result.

This results in an $O(N^2)$ algorithm with linear space.

This can be solved similar to [[Longest Substring Without Repeating Characters]] 

For each alphabet that appears in `str` I will run a sliding window over the string, the window keeps adding the current number as long as I keep seeing it, as soon as I see another number I need to replace it, I only have *k* replaces, as soon as I run out of replaces I must shrink my window from the left to grant me more replaces.

![[Longest Repeating Character Replacement 2026-03-13 17.37.33.excalidraw]]

