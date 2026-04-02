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

Regarding the base, if we choose a base that is smaller than the character set then that means *more than one character in the string is going to have the same representation* which will guarantee collisions.

The polynomial specifically allows $O(1)$ rolling and avoids *anagrams*. Since each character is going to be multiplied by a different number $b^x$ this guarantees that the contributions of those in the hash value would vary!

Below are implementations of the algorithm, which demonstrate string matching

```cpp
#include <bits/stdc++.h>
using namespace std;

static long long modPow(long long a, long long e, long long mod) {
    long long r = 1 % mod;
    a %= mod;
    while (e > 0) {
        if (e & 1) r = (r * a) % mod;
        a = (a * a) % mod;
        e >>= 1;
    }
    return r;
}

vector<int> rabinKarp(const string& text, const string& pattern) {
    int n = (int)text.size(), m = (int)pattern.size();
    if (m == 0 || m > n) return {};

    const long long d = 256;          // base (roughly size of char set)
    const long long q = 1000000007;  // large prime modulus

    // d^(m-1) % q for removing leading char contribution
    long long h = modPow(d, m - 1, q);

    auto code = [](char c) { return (int)(unsigned char)c; };

    // initial hash values
    long long pHash = 0, tHash = 0;
    for (int i = 0; i < m; i++) {
        pHash = (d * pHash + code(pattern[i])) % q;
        tHash = (d * tHash + code(text[i])) % q;
    }

    vector<int> matches;

    for (int i = 0; i <= n - m; i++) {
        // If hash matches, verify to avoid collisions
        if (pHash == tHash) {
            if (text.compare(i, m, pattern) == 0)
                matches.push_back(i);
        }

        // Roll the hash: remove text[i], add text[i+m]
        if (i < n - m) {
            tHash = (d * (tHash - code(text[i]) * h % q) + code(text[i + m])) % q;
            if (tHash < 0) tHash += q;
        }
    }

    return matches;
}

int main() {
    string text = "ababcabcabababd";
    string pattern = "ababd";

    auto res = rabinKarp(text, pattern);
    for (int idx : res) cout << idx << " ";
    cout << "\n";
}
```
