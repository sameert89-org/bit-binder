#needcode150 #sliding_window 

Problem Link: https://leetcode.com/problems/longest-repeating-character-replacement/

The first approach that comes to mind is to use bruteforce to generate all substrings and for each substring count the frequency of the alphabets. There will be one substring for alphabet X with length Cx + K, where Cx is the count of X in the substring, replacing K elements in this substring will yield the result.

This results in an $O(N^2)$ algorithm with linear space.

To optimize this, we need to ask ourselves, how do I know if a string is the best for using my K choices? Furthermore I know that the length of a substring would be difference between 2 indices more or less.

What if I can find this out on the fly?

I can store the `last_seen` of each number and 