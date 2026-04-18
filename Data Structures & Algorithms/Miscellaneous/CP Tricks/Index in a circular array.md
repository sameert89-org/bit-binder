In a circular array the rollback logic can get messy if you use `if-else` statements. There is a much cleaner way of doing this.

```cpp
int leftIdx(int idx, int N) {
	return (idx - 1 + N) % N;
}

int rightIdx(int idx, int N) {
	return (idx + 1) % N;
}
```