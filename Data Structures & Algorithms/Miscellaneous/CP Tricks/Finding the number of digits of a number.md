## Using Modulo

This is the simplest way of doing this

```cpp
int numDigits(int n) {
	int res = 0;
	while(n) 
}
```

## Using Log10

This can be done using the property of $\log_{10}$

```cpp
int numDigits(int n) {
	return floor(log10(n)) + 1;		
}
```

This happense because n is a decimal number, this result can be generalized to any base representation

for example `101` is 5 in base 2 

$\log_25 = 2.32$

Adding 1 after performing greatest integer function, we get numb digits = 3. Which is true for binary we only have 3 digits.


> [!warning] This method is unreliable and only works for $n\geq1   \forall n\in Z$
> This only works for such numbers because logarithm is not defined for numbers less than equal to zero. This is also not applicable on non integers. This can produce wrong results due to floating point precisions.
