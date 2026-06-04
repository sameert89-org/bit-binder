#ai_co_author
Digit DP is just **normal DP, but while building a number digit-by-digit**.

You use it when the problem says:

> Count numbers between `L` and `R` such that their digits satisfy some condition.

Examples:

```text
count numbers <= N having at least one 7
count numbers <= N whose digits are strictly increasing
count numbers <= N with digit sum divisible by k
count numbers <= N having at least one 3, one 5, and one 7
```

The core trick:

```text
answer for [L, R] = count(<= R) - count(<= L - 1)
```

So Digit DP usually means:

```text
f(N) = count valid numbers from 0 to N
```

Then subtract.

---

## 1. The basic idea

Suppose `N = 527`.

You want to count valid numbers from `0` to `527`.

You build the number from left to right:

```text
position 0: choose digit for hundreds place
position 1: choose digit for tens place
position 2: choose digit for ones place
```

But while choosing digits, you must not exceed `527`.

So at position `0`, you cannot choose more than `5`.

If you choose:

```text
digit = 0,1,2,3,4
```

then the rest can be anything from `0-9`.

But if you choose:

```text
digit = 5
```

then you are still restricted by `527`.

At position `1`, you cannot choose more than `2`.

This is what the famous `tight` flag means.

---

## 2. What is `tight`?

`tight` means:

```text
Are we still equal to the prefix of N?
```

Example: `N = 527`

While building:

```text
chosen prefix = 5
N prefix      = 5
```

Still tight.

Next digit can be at most `2`.

But:

```text
chosen prefix = 4
N prefix      = 5
```

Now we are already smaller than `N`.

So the remaining digits can be anything `0..9`.

Therefore:

```python
limit = digits[pos] if tight else 9
```

And after choosing digit `d`:

```python
new_tight = tight and (d == limit)
```

More safely:

```python
new_tight = tight and (d == digits[pos])
```

---

## 3. Smallest possible Digit DP

Problem:

> Count numbers from `0` to `N` that contain at least one digit `7`.

State:

```text
pos       = current digit index
tight     = are we still bounded by N?
has7      = have we used digit 7 so far?
```

Python:

```python
from functools import cache

def count_with_7(n: int) -> int:
    if n < 0:
        return 0

    digits = list(map(int, str(n)))

    @cache
    def dp(pos: int, tight: bool, has7: bool) -> int:
        if pos == len(digits):
            return 1 if has7 else 0

        limit = digits[pos] if tight else 9
        ans = 0

        for d in range(limit + 1):
            new_tight = tight and (d == digits[pos])
            new_has7 = has7 or (d == 7)

            ans += dp(pos + 1, new_tight, new_has7)

        return ans

    return dp(0, True, False)


def count_with_7_between(l: int, r: int) -> int:
    return count_with_7(r) - count_with_7(l - 1)
```

Usage:

```python
print(count_with_7_between(1, 100))
```

This counts:

```text
7, 17, 27, 37, 47, 57, 67, 70-79, 87, 97
```

---

## 4. The one annoying thing: leading zeroes

Digit DP usually builds fixed-length strings.

For example, when counting up to `527`, the number `7` is treated as:

```text
007
```

This is fine for many problems, like “contains digit 7”, because `007` still contains `7`.

But for some problems, leading zeroes can break things.

Example:

> Digits should be strictly increasing.

The number `123` is valid.

But `7` as `007` is not strictly increasing because `0,0,7`.

So we need another flag:

```text
started = have we placed a real non-leading-zero digit yet?
```

---

## 5. Count numbers with strictly increasing digits

Problem:

> Count numbers from `1` to `N` where every digit is greater than the previous digit.

Examples:

```text
123 valid
159 valid
112 invalid
321 invalid
7 valid
```

State:

```text
pos
tight
started
prev_digit
```

Code:

```python
from functools import cache

def count_strictly_increasing(n: int) -> int:
    if n <= 0:
        return 0

    digits = list(map(int, str(n)))

    @cache
    def dp(pos: int, tight: bool, started: bool, prev: int) -> int:
        if pos == len(digits):
            return 1 if started else 0

        limit = digits[pos] if tight else 9
        ans = 0

        for d in range(limit + 1):
            new_tight = tight and (d == digits[pos])

            if not started:
                if d == 0:
                    # Still skipping leading zeroes
                    ans += dp(pos + 1, new_tight, False, -1)
                else:
                    # First real digit
                    ans += dp(pos + 1, new_tight, True, d)
            else:
                if d > prev:
                    ans += dp(pos + 1, new_tight, True, d)

        return ans

    return dp(0, True, False, -1)


def count_strictly_increasing_between(l: int, r: int) -> int:
    return count_strictly_increasing(r) - count_strictly_increasing(l - 1)
```

---

## 6. Add “must contain 5 and 7”

Now suppose:

> Count numbers from `L` to `R` whose digits are strictly increasing and contain both `5` and `7`.

State becomes:

```text
pos
tight
started
prev
has5
has7
```

Code:

```python
from functools import cache

def count_increasing_with_5_and_7(n: int) -> int:
    if n <= 0:
        return 0

    digits = list(map(int, str(n)))

    @cache
    def dp(pos: int, tight: bool, started: bool, prev: int, has5: bool, has7: bool) -> int:
        if pos == len(digits):
            return 1 if started and has5 and has7 else 0

        limit = digits[pos] if tight else 9
        ans = 0

        for d in range(limit + 1):
            new_tight = tight and (d == digits[pos])

            if not started:
                if d == 0:
                    ans += dp(pos + 1, new_tight, False, -1, has5, has7)
                else:
                    ans += dp(
                        pos + 1,
                        new_tight,
                        True,
                        d,
                        has5 or d == 5,
                        has7 or d == 7,
                    )
            else:
                if d > prev:
                    ans += dp(
                        pos + 1,
                        new_tight,
                        True,
                        d,
                        has5 or d == 5,
                        has7 or d == 7,
                    )

        return ans

    return dp(0, True, False, -1, False, False)


def count_between(l: int, r: int) -> int:
    return count_increasing_with_5_and_7(r) - count_increasing_with_5_and_7(l - 1)
```

That is already a proper Digit DP.

---

## 7. Cleaner version using bitmask

Instead of:

```python
has5
has7
```

use a bitmask.

For example:

```text
bit 0 -> have digit 5
bit 1 -> have digit 7
```

Then:

```python
if d == 5:
    mask |= 1

if d == 7:
    mask |= 2
```

Final condition:

```python
mask == 3
```

Code:

```python
from functools import cache

def count_increasing_with_5_and_7(n: int) -> int:
    if n <= 0:
        return 0

    digits = list(map(int, str(n)))

    @cache
    def dp(pos: int, tight: bool, started: bool, prev: int, mask: int) -> int:
        if pos == len(digits):
            return 1 if started and mask == 3 else 0

        limit = digits[pos] if tight else 9
        ans = 0

        for d in range(limit + 1):
            new_tight = tight and (d == digits[pos])

            if not started:
                if d == 0:
                    ans += dp(pos + 1, new_tight, False, -1, mask)
                else:
                    new_mask = mask
                    if d == 5:
                        new_mask |= 1
                    if d == 7:
                        new_mask |= 2

                    ans += dp(pos + 1, new_tight, True, d, new_mask)

            else:
                if d > prev:
                    new_mask = mask
                    if d == 5:
                        new_mask |= 1
                    if d == 7:
                        new_mask |= 2

                    ans += dp(pos + 1, new_tight, True, d, new_mask)

        return ans

    return dp(0, True, False, -1, 0)
```

---

## 8. How to design a Digit DP state

Ask yourself:

> While building the number from left to right, what do I need to remember?

Common state variables:

```text
pos       current digit index
tight     whether current prefix is equal to N's prefix
started   whether we have placed a non-leading-zero digit
prev      previous digit, for increasing/decreasing constraints
sum       digit sum so far
mod       current value modulo k
mask      which required digits have appeared
count     how many times something happened
```

Examples:

### Contains at least one 7

```text
dp(pos, tight, has7)
```

### Digit sum divisible by 3

```text
dp(pos, tight, sum_mod_3)
```

### Strictly increasing digits

```text
dp(pos, tight, started, prev)
```

### Contains 3, 5, and 7

```text
dp(pos, tight, mask)
```

### Strictly increasing and contains 3, 5, and 7

```text
dp(pos, tight, started, prev, mask)
```

### No two adjacent digits equal

```text
dp(pos, tight, started, prev)
```

### Number itself divisible by K

```text
dp(pos, tight, started, remainder)
```

When placing digit `d`:

```python
new_remainder = (remainder * 10 + d) % K
```

---

## 9. The mental template

Most Digit DP problems look like this:

```python
from functools import cache

def solve_upto(n: int) -> int:
    if n < 0:
        return 0

    digits = list(map(int, str(n)))

    @cache
    def dp(pos, tight, started, ...state):
        if pos == len(digits):
            return 1 if final_condition else 0

        limit = digits[pos] if tight else 9
        ans = 0

        for d in range(limit + 1):
            new_tight = tight and (d == digits[pos])

            if not started and d == 0:
                ans += dp(pos + 1, new_tight, False, ...unchanged_state)
            else:
                # validate digit d
                # update state
                ans += dp(pos + 1, new_tight, True, ...new_state)

        return ans

    return dp(0, True, False, ...initial_state)


def solve(l, r):
    return solve_upto(r) - solve_upto(l - 1)
```

Remember this template. Most problems are just filling the state.

---

## 10. Why Digit DP feels hard at first

Because you are solving two problems at once:

1. Keeping the number `<= N`.
    
2. Tracking the digit-property.
    

`tight` handles the first part.

Your custom state handles the second part.

That’s it.

---

## 11. When to prefer combinatorics vs Digit DP

For your example:

> Numbers between `x` and `y`, having at least one `5`, one `7`, and digits strictly increasing.

Pure combinatorics can solve some versions of this, especially if the range is something clean like:

```text
all 4-digit numbers
all numbers with length <= 10
```

But once the range is arbitrary:

```text
x = 38472
y = 928471
```

combinatorics becomes annoying because you need to handle prefix boundaries manually.

Digit DP handles arbitrary bounds naturally.

Use Digit DP when:

```text
range is arbitrary
multiple digit constraints exist
number can be large
you need guaranteed correctness
```

Use combinatorics when:

```text
range is clean
constraint is simple
you can derive a closed-form count confidently
```

For competitive programming, Digit DP is the safer hammer.

---

## 12. Practice order

Do these in order:

1. Count numbers `<= N` containing digit `7`.
    
2. Count numbers `<= N` not containing digit `7`.
    
3. Count numbers `<= N` with digit sum divisible by `K`.
    
4. Count numbers `<= N` with no adjacent equal digits.
    
5. Count numbers `<= N` with strictly increasing digits.
    
6. Count numbers `<= N` containing digits `3`, `5`, and `7`.
    
7. Combine increasing digits + required digits.
    
8. Count numbers `<= N` divisible by `K`.
    

Once you can write these, most Digit DP problems become state-design problems, not implementation problems.