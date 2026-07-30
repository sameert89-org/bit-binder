#ai_co_author 
Combinatorics in CP usually appears as counting choices, arrangements, strings, paths, subsets, or probability states. The trick is to first decide whether **order matters**, whether **repetition is allowed**, and whether some objects are **identical**.

## Quick decision table

| Situation | Formula | Meaning |
| --- | --- | --- |
| Pick `r` from `n`, order does not matter | $\binom{n}{r}$ | combinations |
| Pick `r` from `n`, order matters | $P(n, r) = \frac{n!}{(n-r)!}$ | permutations of length `r` |
| Arrange all `n` distinct objects | $n!$ | full permutation |
| Pick `r` from `n`, repetition allowed, order matters | $n^r$ | every slot has `n` choices |
| Pick `r` from `n`, repetition allowed, order does not matter | $\binom{n+r-1}{r}$ | multisets / stars and bars |
| Arrange multiset with frequencies $f_1, f_2, \dots, f_k$ | $\frac{n!}{f_1!f_2!\dots f_k!}$ | repeated characters case |

## Number of ways to pick `r` things from `n` things

The number of ways is given by ${}^{n}C_{r}$, also denoted by $\binom{n}{r}$.

$$
\binom{n}{r} = \frac{n!}{r!(n-r)!}
$$

This is used when the selected items are distinct, but the order of selection does not matter.

For example, choosing `{a, b}` is the same as choosing `{b, a}`.

Useful identities:

- $\binom{n}{r} = \binom{n}{n-r}$
- $\binom{n}{0} = \binom{n}{n} = 1$
- $\binom{n}{r} = 0$ when $r < 0$ or $r > n$
- $\binom{n}{r} = \binom{n-1}{r} + \binom{n-1}{r-1}$

The last identity is the reason Pascal's triangle works. Either you do not take the current element, giving $\binom{n-1}{r}$, or you take it, giving $\binom{n-1}{r-1}$.

## Number of ways to arrange `n` things into `r` slots

If all objects are distinct and a slot can be filled at most once, then order matters and we use permutation:

$$
P(n, r) = n \cdot (n-1) \cdot (n-2) \dots (n-r+1) = \frac{n!}{(n-r)!}
$$

For example, arranging 3 people in 2 chairs gives:

$$
P(3, 2) = 3 \cdot 2 = 6
$$

If repetition is allowed, then every slot has `n` choices:

$$
n^r
$$

This is common in strings: number of lowercase strings of length `k` is $26^k$.

## Repeated characters / identical objects

This is one of the most common cases in CP.

If all characters are distinct, a string of length `n` has $n!$ permutations. But if some characters repeat, swapping equal characters does not create a new string.

For a string with total length `n` and frequencies:

$$
f_1, f_2, \dots, f_k
$$

the number of distinct permutations is: ^6f5072

$$
\frac{n!}{f_1!f_2!\dots f_k!}
$$

Example: `AABBC`

$$
\frac{5!}{2!2!1!} = 30
$$

Why divide? Because the two `A`s can be internally swapped in $2!$ ways without changing the string, same for the two `B`s.

### Repeated characters with fixed positions

If the problem asks for strings with exact character counts, it is usually the same formula.

Example: number of binary strings of length `n` with exactly `k` ones:

$$
\binom{n}{k}
$$

Reason: choose which `k` positions contain `1`; the remaining positions are `0`.

For counts of many characters:

$$
\frac{n!}{c_1!c_2!\dots c_m!}
$$

This is also called a **multinomial coefficient**.

## Stars and bars

Use this when you need to distribute identical items into distinct boxes.

Number of non-negative integer solutions to:

$$
x_1 + x_2 + \dots + x_k = n
$$

is:

$$
\binom{n+k-1}{k-1}
$$

Think of `n` stars and `k - 1` bars. The bars split the stars into `k` groups.

Example: distribute 5 identical candies among 3 kids:

$$
\binom{5+3-1}{3-1} = \binom{7}{2}
$$

If every variable must be positive:

$$
x_1 + x_2 + \dots + x_k = n, \quad x_i \ge 1
$$

give 1 item to every box first. Now distribute `n-k` remaining items:

$$
\binom{n-1}{k-1}
$$

If lower bounds are given, like $x_i \ge a_i$, subtract those first:

$$
y_i = x_i - a_i
$$

then solve with non-negative variables.

## Bounded distribution

Stars and bars handles lower bounds easily but upper bounds need extra work.

If:

$$
0 \le x_i \le limit
$$

then common approaches are:

- DP over boxes and current sum.
- Inclusion-exclusion when `k` and limits are manageable.
- Prefix-sum optimized DP when all boxes have similar limits.

The DP idea:

```cpp
dp[i][sum] = number of ways using first i boxes to make sum
```

Then transition by trying how many items go into the next box.

## Circular arrangements

For arranging `n` distinct objects around a circle, rotations are considered the same.

So instead of $n!$, the answer is:

$$
(n-1)!
$$

Reason: fix one object as the anchor, arrange the remaining `n - 1` objects around it.

If clockwise and anticlockwise are also considered the same, divide by 2:

$$
\frac{(n-1)!}{2}
$$

This second formula only makes sense when `n > 2`.

## Subsets and subsequences

For a set of `n` distinct elements, every element has two choices: take it or do not take it.

$$
2^n
$$

Number of non-empty subsets:

$$
2^n - 1
$$

Number of subsequences of a string of length `n` is also $2^n$ if positions are considered distinct.

But number of **distinct subsequences** is different when characters repeat and usually needs DP.

## Grid paths

If you need to go from top-left to bottom-right in an `n x m` grid using only right and down moves, you must make:

- `n - 1` down moves
- `m - 1` right moves

Total moves:

$$
n + m - 2
$$

So the number of paths is:

$$
\binom{n+m-2}{n-1} = \binom{n+m-2}{m-1}
$$

This is just the repeated-character formula where the string contains `D` repeated `n - 1` times and `R` repeated `m - 1` times.

## Inclusion-exclusion

Use inclusion-exclusion when it is easier to count everything and subtract invalid cases, but invalid groups overlap.

For two bad conditions:

$$
|A \cup B| = |A| + |B| - |A \cap B|
$$

For many conditions:

$$
\left|\bigcup A_i\right| = \sum |A_i| - \sum |A_i \cap A_j| + \sum |A_i \cap A_j \cap A_k| - \dots
$$

CP examples:

- Count numbers not divisible by any of some primes.
- Count strings missing at least one required character.
- Count distributions where no box exceeds a limit.

## Derangements

A derangement is a permutation where no element stays in its original position.

Number of derangements of `n` elements is written as `!n`.

Recurrence:

$$
D_n = (n-1)(D_{n-1} + D_{n-2})
$$

Base cases:

$$
D_0 = 1, \quad D_1 = 0
$$

Approximation:

$$
D_n \approx \frac{n!}{e}
$$

## Computing nCr in CP

### Small n, no modulo

Use Pascal's triangle:

```cpp
vector<vector<long long>> C(n + 1, vector<long long>(n + 1));

for (int i = 0; i <= n; i++) {
	C[i][0] = C[i][i] = 1;
	for (int j = 1; j < i; j++) {
		C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
	}
}
```

This is $O(n^2)$ time and space.

### Single nCr without modulo

Avoid calculating full factorials if the answer fits in `long long`.

```cpp
long long nCr(int n, int r) {
	if (r < 0 || r > n) return 0;
	r = min(r, n - r);

	long long ans = 1;
	for (int i = 1; i <= r; i++) {
		ans = ans * (n - r + i) / i;
	}
	return ans;
}
```

This works because every intermediate division is exact for this multiplication order in integer arithmetic for reasonable values, but `ans * value` can still overflow.

### nCr modulo prime

For many queries under a prime modulo like $10^9 + 7$, precompute factorials and inverse factorials.

$$
\binom{n}{r} \bmod M = fact[n] \cdot invFact[r] \cdot invFact[n-r] \bmod M
$$

```cpp
const long long MOD = 1e9 + 7;

long long binpow(long long a, long long b) {
	long long res = 1;
	while (b > 0) {
		if (b & 1) res = res * a % MOD;
		a = a * a % MOD;
		b >>= 1;
	}
	return res;
}

vector<long long> fact, invFact;

void buildFactorials(int n) {
	fact.assign(n + 1, 1);
	invFact.assign(n + 1, 1);

	for (int i = 1; i <= n; i++) {
		fact[i] = fact[i - 1] * i % MOD;
	}

	invFact[n] = binpow(fact[n], MOD - 2);
	for (int i = n - 1; i >= 0; i--) {
		invFact[i] = invFact[i + 1] * (i + 1) % MOD;
	}
}

long long nCr(int n, int r) {
	if (r < 0 || r > n) return 0;
	return fact[n] * invFact[r] % MOD * invFact[n - r] % MOD;
}
```

Precomputation is $O(n \log MOD)$ because of one modular inverse, and each query is $O(1)$.

### nCr modulo non-prime

Do not blindly use Fermat's Little Theorem when the modulo is not prime. Modular inverse may not exist.

Common options:

- Use Pascal DP if constraints allow.
- Use prime factorization of numerator and denominator.
- Use Lucas theorem / CRT style methods if the problem specifically pushes there.

## Lucas theorem

Lucas theorem is useful when `n` and `r` are huge, but modulo `p` is small and prime.

Write `n` and `r` in base `p`:

$$
n = n_k n_{k-1} \dots n_0, \quad r = r_k r_{k-1} \dots r_0
$$

Then:

$$
\binom{n}{r} \equiv \prod_i \binom{n_i}{r_i} \pmod p
$$

If any $r_i > n_i$, the answer becomes 0.

This is a very CP-ish theorem: it looks rare until a problem has absurdly large `n` with a small prime modulo.

## Common CP patterns

- **Choose positions first**: binary strings with `k` ones, grid paths, placing separators.
- **Arrange after choosing**: choose a subset, then permute it.
- **Divide by repetitions**: repeated characters, identical objects, anagrams.
- **Complement counting**: count all cases minus bad cases.
- **Inclusion-exclusion**: bad cases overlap.
- **DP when constraints are bounded**: upper bounds, distinct subsequences, restricted strings.
- **Precompute factorials**: many modulo combination queries.
- **Use logs for size estimates**: when only digit count or comparison of enormous factorials is needed; see [[Gamma Function]].

## Quick sanity checks

- If order matters, expect permutations or powers.
- If order does not matter, expect combinations.
- If objects repeat, divide by factorials of frequencies.
- If distributing identical objects, think stars and bars.
- If arranging around a circle, fix one object first.
- If the answer asks modulo a prime, factorial + inverse factorial is usually the default.
- If the modulo is not prime, be suspicious of modular division.