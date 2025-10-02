It is a technique that allows you to calucate $a^n$ using $O(\log(n))$ multiplications instead of standard $n$ multiplications in the naive approach.
The idea is the convert $n$ to its binary representation. From below relation this means that the number of digits will be ~ $log(n)$ that means $a^n$  can be split into $log(n)$ factors.
> [!INFO] Number of digits of a number in base r
> The number of digits in a number in base r representation of it is $\log_r(n) + 1$
For an example
$$
3^{27} = 3^{11011_2} = 3^{16}\cdot3^{8}\cdot3^{2}\cdot3^{1}
$$
But one might ask that we still need to calculate these factors. The pattern is each next factor is just squared or power 4 of the previous one, so it reduces the number of multiplications. Overall complexity remains $O(\log(n))$
## Implementation
This can be done recursively. Using the below recurrence relation.
```python
a**n = (a**(n//2))**2 if n % 2 == 0 else (a**((n-1)//2))**2
```
Below is the iterative implementation which is a bit less straightforward
```cpp
long long binpow(long long a, long long n){
    long long res = 1;
    while(n > 0){
        if(n & 1){
            res *= a;
        }
        a *= a;
        n >>= 1;
    }
    return res;
}```
## Applications
### a to the power b mod m
$(a\cdot b) mod(m) = (amod(m)\cdot bmod(m))mod(m)$ 
```cpp
long long binpow(long long a, long long b, long long m){
    long long res = 1;
    while(b > 0){
        if(b & 1){
            res = res * a % m;
        }
        a = a * a % m;
        b >>= 1;
    }
    return res;
```