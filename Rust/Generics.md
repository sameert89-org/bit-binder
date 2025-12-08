Generics let you write type-safe code that works with multiple types using type parameters.

```rust title="Generics Example"
fn generic_function<T>(value: T) -> T {
	value;
}
```

- During compilation, `rustc` generates multiple functions based on the variants of T, this behavior is called *monomorphization*.

- By default the compiler guesses the most appropriate type for T, but we can force our own types using the *turbofish* operator.

```rust
generic_function::<i64>(6);
```

## Multiple Generics
Standard stuff

```rust
fn multiple_generics<T, U>(a: T, b: U) -> (T, U) {
    (a, b)
}
```
of course you can mix non generic types with generic ones

```rust
fn mix_generics<T>(a: T, b: i32) -> (T, i32) {
    (a, b)
}
```

## Generic Structs

You can define structs with generic type parameters.

```rust
struct TreasureChest<T>{
    pirate: String,
    value: double,
    treasure: T
}
```
### Impl blocks for generic structs

```rust
// Setting the type beforehand
impl TreasureChest<String> {
    fn display_treasure(&self) {
        println!("The treasure is: {}", self.treasure);
    }
}
// Generic impl block
impl<T> TreasureChest<T> {
}
```

## Generic Enums

```rust
enum Maybe<T> {
    Some(T),
    None,
}
```
