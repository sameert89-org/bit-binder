Reversing a number means reversing its digits.

`rev(2560) = 0625` not counting the leading zeros, this becomse 625.

This can be done very easily using the remainders

```cpp
int reverse(int n) {
	int rev = 0;
	
	while(n){
		rev = rev * 10 + n % 10;
		n /= 10;
	}
	return rev;
}
```