Often times you are posed against a problem which has absurdly large inputs so much so that performing mathematical operations on them would surely result in an overflow somewhere.


> [!question] Why not use `BigInt`?
> Almost all mainstream langauges have some kind of builtin or referrable library for handling very large numbers, Java has `BigInt`, C# has `System.Numerics.BigInteger`, python has mechanics so the numbers never overflow. But all these get slower the larger the number gets and its often times too small for the constraints of the problem.

These questions almost always ask something like:

*"Return the answer Modulo $10^9 + 7$"*

What does that even mean? What is Modulo and what is that huge number?


> [!INFO] Modulo 
>  This is nothing but the good old modulus operator `%`, which calculates the remainder if a number if divided by it. For any division the remainder is always going to be in the range $[0, divisor)$. 

### The mystery behind $10^9 + 7$

If you modulo with a large number such as $10^9 + 7$ the very large results will shrink to a smaller range making them easy to fit into the data types with finite space.  But why this specific number? 

This is becuase it's a prime number, as we will see in this article these are very crucial for you to be able to calculate modular multiplicative inverse. 

But there are other prime numbers correct? why not use those?

The main reason *smaller the number, larger the collisions*. Remember we say the range of remainders $[0, divisor)$. If I used a smaller number I would have many test-cases return the same answer, which would make test cases brittle. By choosing $10^9+7$ as the number of choice I ensure I have the least probability of collision in the 32 bit range.

## Modular Arithmetic

### Addition, Subtraction & Multiplication

All of these follow the similar rules.



> [!caution] Intermediate Overflows
> While doing arithmetic involving modulo, its very crucial to do it every step of the calculation where there is a possibility of overflow, doing it at the end on the answer will only cause problems if you had an overflow in between.


