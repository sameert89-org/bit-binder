Generics let you write type-safe code that works with multiple types using type parameters.

```rust title="Generics Example"
fn generic_function<T>(value: T) -> T {
	value;
}
```

