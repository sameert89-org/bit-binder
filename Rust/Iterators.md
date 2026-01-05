*Read More:* [[Loops.md]]

To *iterate* means to traverse a sequence of values one by one.

Rust provides an `Iterator` trait in the `std::iter` module. This trait *requires* the implementation of a single method: `next`. The `next` method returns an `Option<T>`, where `T` is the type of value being iterated over. If there are more values to yield, `next` returns `Some(value)`; otherwise, it returns `None`.

Collections themselves do not implement the `Iterator` trait directly. Instead, they implement the `IntoIterator` trait, which defines the `into_iter` method. This method returns an iterator over the collection, allowing you to use the `for` loop syntax directly on the collection. The `for` loop either uses an iterator directly or calls `into_iter` on the collection to obtain one.

The `for` loop automatically rebinds the iterator as mutable, so you do not need to declare it as mutable explicitly.

Common collections such as `Vec`, `HashMap`, and `HashSet` implement the `IntoIterator` trait. These collections return an `IntoIter` struct that implements the `Iterator` trait.

*Important caveats about iterators:*
- Iterators are *consumed* once used. To iterate again, you must create a new iterator.
- By default, iterators move ownership of the values they yield. If you want to borrow values instead, use methods like `iter()` (for immutable references) or `iter_mut()` (for mutable references) on collections.

```rust
// Example usage:
let v = vec![1, 2, 3];
for x in &v {
    println!("{}", x);
}
```

### `iter` method

The `iter` method does not take ownership of the values unlike the `into_iter` method. Instead, it returns an iterator that yields immutable references to the values in the collection. There is a syntactic sugar for the `for` loop that allows you to use `&collection` to achieve the same effect as calling `collection.iter()`.

```rust
let v = vec![1, 2, 3];
for x in &v { // equivalent to for x in v.iter()
    println!("{}", x); // x is of type &i32 immutable
}
```

### `iter_mut` method
The `iter_mut` method returns an iterator that yields mutable references to the values in the collection. This allows you to modify the values while iterating over them.

```rust
let mut v = vec![1, 2, 3]; // In this case v must be mutable
for x in &mut v { // equivalent to for x in v.iter_mut()
    *x += 1; // x is of type &mut i32 mutable
}
