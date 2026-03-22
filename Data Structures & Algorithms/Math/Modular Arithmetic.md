Often times you are posed against a problem which has absurdly large inputs so much so that performing mathematical operations on them would surely result in an overflow somewhere.

> [!question] Why not use `BigInt`?
> Almost all mainstream langauges have some kind of builtin or referrable library for handling very large numbers, Java has `BigInt`, C# has `System.Numerics.BigInteger`, python has mechanics so the numbers never overflow. But all these get slower the larger the number gets and its often times too small for the constraints of the problem.

These questions almost always ask something like:

_"Return the answer Modulo $10^9 + 7$"_

What does that even mean? What is Modulo and what is that huge number?

> [!INFO] Modulo
> This is nothing but the good old modulus operator `%`, which calculates the remainder if a number if divided by it. For any division the remainder is always going to be in the range $[0, divisor)$.

### The mystery behind $10^9 + 7$

If you modulo with a large number such as $10^9 + 7$ the very large results will shrink to a smaller range making them easy to fit into the data types with finite space. But why this specific number?

This is becuase it's a prime number, as we will see in this article these are very crucial for you to be able to calculate modular multiplicative inverse.

But there are other prime numbers correct? why not use those?

The main reason _smaller the number, larger the collisions_. Remember we say the range of remainders $[0, divisor)$. If I used a smaller number I would have many test-cases return the same answer, which would make test cases brittle. By choosing $10^9+7$ as the number of choice I ensure I have the least probability of collision in the 32 bit range.

## Modular Arithmetic

### Addition, Subtraction & Multiplication

All of these follow the similar rules.

**Addition:**
$$(a + b) \pmod n = \left( (a \pmod n) + (b \pmod n) \right) \pmod n$$

**Subtraction:**
$$(a - b) \pmod n = \left( (a \pmod n) - (b \pmod n) \right) \pmod n$$

**Multiplication:**
$$(a \cdot b) \pmod n = \left( (a \pmod n) \cdot (b \pmod n) \right) \pmod n$$

You can avoid writing these huge equations most of the time, doing mod at the end is fine most of the time in intermediate cases also don't apply %M unnecessarily over and over or on constants such as a number.

```cpp
// somewhere in between a for loop
res = (res % M + x % M) % M; // unnecessary since res is already modded and x is small enough
res = (res + x) % M;

// dont do
y = (y % M + 7 % M) % M;
```

> [!caution] Intermediate Overflows
> While doing arithmetic involving modulo, its very crucial to do it every step of the calculation where there is a possibility of overflow, doing it at the end on the answer will only cause problems if you had an overflow in between.

### Division

Life would be sunshines and rainbows if we did not have modular division. But sometimes there are problems which need it [[Fancy Sequence]].

**What is the problem with division?**
Modulo operator works only with integers, for _addition_, _subtraction_ & _multiplication_ the modulo operator is distributive.

$$
\begin{align*}
f(a,b) \mod{m} &= f(a\mod{m}, b\mod{m})\mod{m} \\
&\implies f(x)\mod{m} = f(y)\mod{m}
\end{align*}
$$

In the division case the result is not distributive, because divison creates fractions and decimals.

Take $\frac{10}{5}\mod{3}$ fro example, if I calculate the individual terms $10\mod{3}$, $5\mod{3}$ and divide them I get, $1+2=3$ but clearly the result if we directly do it is $2$

This works because $\frac{10}{5}$ is an improper fraction and results in a whole number as quiotent, take $\frac{10}{4}$ for instance, the result is `0.25` what even is the remainder when you divide `0.25/3` this result is not defined.

So how do I find the value of $\frac{a}{b} \mod{m}$?

Simple, I know how multiplication works, so I will treat it as a multiplication problem.

$$
\begin{align*}
\frac{a}{b} &= a \cdot b^{-1} \\
\implies \frac{a}{b} \mod{m} &= (a \mod{m}) \cdot (b^{-1} \mod{m}) \mod{m}
\end{align*}
$$

That's just great, but how do I find $b^{-1}$?

We know for sure that $b\cdot b^{-1} \mod{m} = 1$

If you think about it, I need to find an integer `x` which when multiplied with `b` gives me `1` as the **result modulo `m`**.

This is what we call the **modular multiplicative inverse** of `b` modulo `m`. But that does not answer the question of how to find it. The math comes from the **Extended Euclidean Algorithm** and the **Bezout's Identity**.

It states that for any two integers $b$ and $M$, there exist integers $x$ and $y$ such that:

$$
bx + My = \gcd(b, M)
$$

If $b$ and $M$ are coprime, meaning $\gcd(b, M) = 1$, the equation becomes:

$$
bx + My = 1
$$

Now, look at that equation through the lens of modulo $M$:

- $My$ is a multiple of $M$, so modulo $M$, we have $My \equiv 0 \pmod{M}$.
- That simplifies the equation as follows:

$$
\begin{aligned}
bx + My &= 1 \\
bx + 0 &\equiv 1 \pmod{M} \\
bx &\equiv 1 \pmod{M}
\end{aligned}
$$

> [!info] what is that $\equiv$ symbol?
> This is the symbol for congruence in modular arithmetic. When we apply the modulus operator on both sides we cannot say both sides are equal, since more than one number can have same remainder when divided by `M`, we say they are congruent modulo `M`.

It has started to make sense why our choice of $10^9 + 7$ is a prime number, because if $b$ and $M$ are not coprime, meaning they share a common factor greater than 1, then $\gcd(b, M) \neq 1$, and the equation $bx + My = 1$ has no integer solutions. This means that the modular inverse does not exist in such cases.

There are a couple of ways to find the modular inverse, given that $b$ and $M$ are coprime:

### Extended Euclidean Algorithm

This works for any `M` and `b` as long as they are coprime, it runs in $O(\log M)$ time. M may or may not be prime.

