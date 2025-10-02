A range is a sequence of consecutive values.

*similar to python range*

```rust
let my_range = 1..5;
```

- Below table summarizes range types in rust-

| Syntax  | Type               | Meaning                  |
| ------- | ------------------ | ------------------------ |
| `a..b`  | `std::ops::Range`  | half-open: `a ≤ x < b`   |
| `a..=b` | `RangeInclusive`   | inclusive: `a ≤ x ≤ b`   |
| `a..`   | `RangeFrom`        | `x ≥ a`                  |
| `..b`   | `RangeTo`          | `x < b`                  |
| `..=b`  | `RangeToInclusive` | `x ≤ b`                  |
| `..`    | `RangeFull`        | all values in the domain |
- Ranges implement Iterator, so anything which implements that can have be the type in `Range<T>`

```rust
let my_char_range = 'b'..'q';
```

- Ranges can be used for *Array Slicing*

```rust title="Array Slicing Example"
let arr = [0, 1, 2, 3];
assert_eq!(arr[1..3], [1,2]);
```

### Range Iteration
Below is an example with a for loop

```rust title="Range Iteration Example"
for i in 1..=6 {
	println!(i);
}
for i in (1..=6).rev() {
 // Methods are present on Range type
 // Others include .step_by(val)
}
```