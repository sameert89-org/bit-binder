## Naive approach
Start from smaller of a and b, run a loop from b all the way down to 1, keep dividing a and b both by this number, as soon as you find one which divides both, that's GCD.
## Euclidean GCD
The algorithm allows to compute the *greatest common divisor* of two numbers in $O(log(min(a,b)))$ time, compared to O(min(a,b)) in the naive approach.
The original euclidian theorem says:
- If x divides a and b, then x divides a - b.
- That means gcd of a - b and b === gcd of a and b {of course a plethora of other relations are true as a result, a + b and a, a + kb and b etc. But the one that can push us towards reducing the numbers is better and since a > b as our assumption we chose a -b and not b - a or anything just to keep things positive}
- We get the relation $gcd(a,b) = gcd(b, a-b)$
- Subtract b until a < b then swap them if needed and continue until one becomes zero.
- For the base case, if any number is 0 the gcd is always the non zero number. 
This algorithm is fast, but it can be made even faster by reducing the number of times we have to subtract b from a. 
If a is an absurdly large number compared to b, then we it would take a lot of a - b's till a is made either 0 or <= b. Mathematically the number of times we do that can be said as:
> _m such that m * b <= a implies that m <= a/b_
If we try to maximize m, then the maximum value of m would be floor(a,b), so a - floor(a,b)xb.
But a - floor(a,b)xb is just the remainder when a is divided by b 🤔, i.e. a mod b, but the number now is guaranteed to be smaller than a
$gcd(a, b) = gcd(b, a modb)$
## Implementation
```cpp
long long gcd(int a, int b){
	return b == 0 ? a : gcd(b, a % b)
}
```
### Iterative
```cpp
long long gcd (long long a, long long b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}
```