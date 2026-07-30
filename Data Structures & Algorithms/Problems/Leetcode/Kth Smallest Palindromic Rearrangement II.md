#daily_challenge 
2026-07-29

### Ideas?
This is a very challenging problem, its easy to see the basic idea if you have solved these 2 before:

1. [Permutation Sequence](https://leetcode.com/problems/permutation-sequence/)
2. [Smallest Palindromic Rearrangement I](https://leetcode.com/problems/smallest-palindromic-rearrangement-i/)

The second problem tells us about how to make a palindrome, if you think about it only the first half of a palindrome truly matters. since the second part will be identical (or have 1 extra element if string has odd length).

This is because a palindrome can always be broken into 2 identical parts (minus the 1 odd character) that means the second half must be mirror image of first half which means the first half is the one that governs how second half must look, changing any order in second half *in order to get a smaller lexic string* will break the palindromic property.

So now I extract the first half it has $\frac{N}{2}!$  permutations (not all unique thought, more on it later).

Surely if N is small enough we can start with smallest permutation (which is nothing but sorted sequence) and then find the next permutation k times.

But the problem has $N = 10^4$ and $K = 10^6$ this would be $O(NK)$ in the best case which is slow. This takes us to problem i, which has the optimal solution of it by block skipping technique. Which gives us a rough idea on how to solve this problem.

### The main deviation
The main deviation here is that in the other problem N is small (only upto 9), and 9! is doable and you will have every element as unique.

This brings us to some math.
[[Permutations & Combinations#^6f5072]]

The above topic has details on exactly this, since the number of unique characters is just limited to 26 (since there are only 26 alphabets) to achieve this N letters must repeat. This solves one problem of skipping stuff, but the block sizes are still absurdly huge.

in the worst case, `N/2 = 5000 and each 26 character repeats equal times` then the number of permutations is $\frac{5000!}{\frac{5000}{26}!^{26}}$ which when [[Gamma Function|approximated]] has 7000+ digits.

This will never fit inside anything. 

So we can utilize this approach but then how do we find these huge block sizes? 

We know we are capped by k, if we can somehow incrementally calculate this expression then we can skip immediately if we exceed k, this will prevent overflows.

But then how do I calculate this incrementally? since we are not only multiplying but dividing stuff?

### Incremental Calculation of the Multinomial Coefficient
 ![[Media.jpg]]

This is the trick, this can also be done in reverse, can fill x slots first then remaining n - x slots with y then remaining n - x - y slots with z but we need to start with the smaller number here.

This allows us to cap at k and break out and actually apply the skip technique properly.

```cpp
class Solution {
public:
    long long distinctPermutations(const vector<int>& freq, long long k) {
        long long permutations = 1;
        int elementsAlreadyPlaced = 0;

        for (const int frequency : freq) {
            for (int added = 1; added <= frequency; ++added) {
                const long long next =
                    permutations * (elementsAlreadyPlaced + added) / added;

                if (next >= k) {
                    return k;
                }

                permutations = static_cast<long long>(next);
            }

            elementsAlreadyPlaced += frequency;
        }

        return permutations;
    }
    string smallestPalindrome(string s, int k) {
        const int N = s.size();
        string half = s.substr(0, N / 2);
        sort(half.begin(), half.end());

        // take half of the string, now find the kth lexicographically smallest
        // permutation of it, this can be done using skip technique for each
        // position
        vector<int> freq(26);

        for (auto ch : half) {
            freq[ch - 'a']++;
        }

        string res = "";
        res.reserve(2 * half.size());
        
        for (int i = 0; i < N / 2; i++) {
            int j = 0;
            while (j < 26 and !freq[j])
                j++;
            while (j < 26 and k) {
                if (!freq[j]) {
                    j++;
                    continue;
                }
                freq[j]--;
                long long blockSize = distinctPermutations(freq, k);
                if(k > blockSize) {
                    k -=  blockSize; // k doesnt exist in this block, keep going next
                    freq[j]++;
                } else {
                    res += static_cast<char>('a' + j);   // k exists in this block
                    break;
                }
                
                j++;
            }
            // cout << format("count: {}, res: {}, j: {}\n", count ,res, j);
            if (j == 26 and k)
                return "";
            // cout << j << endl;
            2 1 22
        }
        // cout << res;

        int end = res.size() - 1;
        if (N & 1) {
            res += s[N / 2];
        }

        for (int i = end; i > -1; i--) {
            res += res[i];
        }
        return res;
    }
};
```