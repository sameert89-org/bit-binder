This can be done using the property of $\log_{10}$

```cpp
int numDigits(int n) {
	return log10(n) + 1;		
}
```

This happense because n is a decimal number, this result can be generalized to any base representation

for example `101` is 5 in base 2,