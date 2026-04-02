This is another substring find algorithm.. The main idea behind Rabin-Karp is to use hashing to quickly compare substrings.

## The "Rolling Hash"

Here we use a special type of hash called a *rolling hash* that can be updated efficiently as the substring window moves one character at a time.

It can be thought of like a sliding window. 

A very simple rolling hash can be computed by summing the numeric values of the characters in the current window. But this can easily fail when the character set is unique enough causing a hash-collison leading to an incorrect result.

 A more robust rolling hash uses a polynomial (weighted) hash modulo a large number to reduce collisions. 

This hash function can be written as:
$$ H(s)=\left(\sum_{i=0}^{m-1} s_i \, d^{\,m-1-i}\right)\bmod q $$

where $s_i$ represents the character in the string at index i. $d^x$ represents the base which is usually a prime number roughly equal tothe size of the character set. $q$ is a large prime modulus and $m$ is the length of the substring window. 

**Why does this work?**
The q allows this hash function to be uniform and in the range $[0, q-1]$

Regarding the base, if we choose a base that is smaller than the character set 