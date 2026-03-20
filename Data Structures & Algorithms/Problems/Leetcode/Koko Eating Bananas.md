#needcode150 #binary-search 

[Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)

Standard binary search, with a caveat around the floating point arithmetic, you can use double but a clever way to calculate `ceil(a/b)` is:

$$
\lceil(\frac{a}{b}) = \frac{a + b - 1}{b}
$$
Its better adviced to use `long` as the accumulator to avoid overflows while doing `a + b` 

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        // simple binary search on k
        int s = 1, e = *max_element(piles.begin(), piles.end()), k = 0;
        auto canEat = [&](int k) mutable -> bool {
            int totalHours = h;
            for(auto const &pile: piles) {
                int hoursTaken = ceil(double(pile) / k);
                totalHours -= hoursTaken;
                if(totalHours < 0) return false;
            }
            return true;
        };
        while(s <= e) {
            int mid = s + (e - s) / 2;
            if(canEat(mid)) {
                k = mid; // potential answer
                e = mid - 1;
            } else {
                s = mid + 1;
            }
        }
        return k;
    }
};
```