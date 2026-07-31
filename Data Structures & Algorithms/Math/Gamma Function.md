#ai_co_author 
The Gamma function extends factorials from integers to real and complex numbers.

For positive integers:

$$
\Gamma(n) = (n-1)!
$$

So:

$$
n! = \Gamma(n+1)
$$

This is useful in CP and numerical programming when factorials are too large to store, but we only need an estimate, a logarithm, a digit count, or a comparison.

## Why factorials explode

Even `100!` has 158 digits. `1000000!` is far beyond any fixed-width integer and too large for usual floating point as a direct value.

So instead of computing $n!$, we often compute:

$$
\log(n!)
$$

Using Gamma:

$$
\log(n!) = \log(\Gamma(n+1))
$$

This is exactly what `lgamma` gives you.

## gamma

`gamma(x)` returns $\Gamma(x)$.

For integers:

```cpp
tgamma(n + 1) // approximately n!
```

In C++ the function is named `tgamma` because the historical name `gamma` was already used differently on some systems.

```cpp
#include <cmath>
#include <iostream>

int main() {
    std::cout << std::tgamma(6) << '\n'; // 5! = 120
}
```

In Python:

```python
import math

print(math.gamma(6)) # 5! = 120.0
```

This is not good for absurdly large factorials because the result itself overflows floating point quickly.

## lgamma

`lgamma(x)` returns:

$$
\log(|\Gamma(x)|)
$$

For factorials:

$$
\log(n!) = \operatorname{lgamma}(n+1)
$$

This is the most useful version for CP.

### Estimate number of digits in n!

Number of decimal digits in a positive integer `x` is:

$$
\lfloor \log_{10}(x) \rfloor + 1
$$

Since `lgamma` gives natural log, convert using $\log(10)$:

$$
digits(n!) = \left\lfloor \frac{\operatorname{lgamma}(n+1)}{\log(10)} \right\rfloor + 1
$$

```cpp
#include <cmath>
#include <iostream>

long long factorialDigits(long long n) {
    if (n <= 1) return 1;
    return (long long)(std::lgamma((long double)n + 1) / std::log((long double)10)) + 1;
}

int main() {
    std::cout << factorialDigits(1000000) << '\n';
}
```

Python:

```python
import math

def factorial_digits(n: int) -> int:
    if n <= 1:
        return 1
    return int(math.lgamma(n + 1) / math.log(10)) + 1
```

### Compare huge factorial expressions

Suppose you need to compare:

$$
\frac{a!}{b!c!}
$$

without computing it. Take logs:

$$
\log\left(\frac{a!}{b!c!}\right) = \log(a!) - \log(b!) - \log(c!)
$$

Using `lgamma`:

```cpp
long double logValue = std::lgamma((long double)a + 1)
                     - std::lgamma((long double)b + 1)
                     - std::lgamma((long double)c + 1);
```

This lets you compare enormous combinatoric values by comparing their logs.

### Approximate nCr

For very large `n` and `r`, the logarithm of $\binom{n}{r}$ is:

$$
\log\binom{n}{r} = \log(n!) - \log(r!) - \log((n-r)!)
$$

So:

```cpp
long double logNcr(long long n, long long r) {
    if (r < 0 || r > n) return -INFINITY;
    return std::lgamma((long double)n + 1)
         - std::lgamma((long double)r + 1)
         - std::lgamma((long double)(n - r) + 1);
}
```

If the actual value is still representable as floating point, you can exponentiate:

```cpp
long double approx = std::exp(logNcr(n, r));
```

But for absurdly large answers, keep it in log form.

## Gamma vs modular factorials

Gamma functions are floating-point tools. They are not exact integer combinatorics tools.

Use `lgamma` when the problem asks for:

- number of digits in `n!`
- approximate value of `n!`
- comparing huge factorial expressions
- logarithmic probability calculations

Do not use Gamma when the problem asks for:

- exact `n! mod M`
- exact $\binom{n}{r} \bmod M$
- exact number of permutations

For modulo answers, precompute factorials and inverse factorials instead.

## Stirling's approximation

Before `lgamma`, people often used Stirling's approximation:

$$
n! \approx \sqrt{2\pi n}\left(\frac{n}{e}\right)^n
$$

Taking logs:

$$
\log(n!) \approx \frac{1}{2}\log(2\pi n) + n\log(n) - n
$$

This is good for intuition and sometimes enough for estimates, but `lgamma(n + 1)` is usually simpler and more accurate.

## CP cheat sheet

```cpp
#include <algorithm>
#include <cmath>
#include <limits>

long double logFact(long long n) {
    return std::lgamma((long double)n + 1);
}

long long factDigits(long long n) {
    if (n <= 1) return 1;
    return (long long)(logFact(n) / std::log((long double)10)) + 1;
}

long double logNcr(long long n, long long r) {
    if (r < 0 || r > n) return -std::numeric_limits<long double>::infinity();
    r = std::min(r, n - r);
    return logFact(n) - logFact(r) - logFact(n - r);
}
```

Mental model:

- `gamma(n + 1)` estimates `n!` until floating point overflows.
- `lgamma(n + 1)` estimates `log(n!)` safely for huge `n`.