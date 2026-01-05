*Read More:* [[Loops.md]]
Iterate means to traverse a sequence of values one-by-one.

Rust provides an `Iterator` trait in the `std::iter` module, it *requires* the implementation of a single method, `next`, which returns an `Option<T>`, where `T` is the type of the value being iterated over. If there are more values to yield, `next` returns `Some(value)`, otherwise it returns `None`.

The collections themselves don't implement the `Iterator` trait directly. Instead they implement the `IntoIterator` trait, which defines a method `into_iter` that returns an iterator over the collection. This also allows the use of the `for` loop syntax on the collection.

Common collections such as `Vec`, `HashMap`, and `HashSet` implement the `IntoIterator` trait, these return an IntoIter struct that implements the `Iterator` trait.

*Some important caveats of iterators:*
- Iterators exhaust their values once consumed. To iterate again, you need to create a new iterator.
- Iterators by default move ownership of the values they yield. If you want to borrow values instead, you can use methods like `iter()` or `iter_mut()` on collections.

```rust

```
