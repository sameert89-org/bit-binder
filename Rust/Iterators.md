*Read More:* [[Loops.md]]

To *iterate* means to traverse a sequence of values one by one.

Rust provides an `Iterator` trait in the `std::iter` module. This trait *requires* the implementation of a single method: `next`. The `next` method returns an `Option<T>`, where `T` is the type of value being iterated over. If there are more values to yield, `next` returns `Some(value)`; otherwise, it returns `None`.

Collections themselves do not implement the `Iterator` trait directly. Instead, they implement the `IntoIterator` trait, which defines the `into_iter` method. This method returns an iterator over the collection, allowing you to use the `for` loop syntax directly on the collection. The `for` loop either uses an iterator directly or calls `into_iter` on the collection to obtain one.

```rust
let mut todos = HashMap::new();
todos.insert("Learn Rust", false);

for (todo, completion_status) in &todos{
    println!("{}: {}", todo, completion_status);
}
```
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
```

> [!WARNING] String Iterations
> There are certain complexities when iterating over strings in Rust due to UTF-8 encoding. Iterating over a string using `chars()` yields Unicode scalar values, while `bytes()` yields raw bytes. Be cautious when modifying strings during iteration, as it may lead to invalid UTF-8 sequences.
> ```rust
> let s = String::from("hello");
> for c in s.chars() {
>     println!("{}", c); // c is of type char
> }
> for b in s.bytes() {
>     println!("{}", b); // b is of type u8
> }
> ```

## Adapter Methods
An adapter metod is one that transforms an iterator into another iterator based on some logic.
Below are some common adapter methods:

### Map Method
The `map` method takes a closure as an argument and applies that closure to each item yielded by the iterator, producing a new iterator with the transformed values. The original iterator remains unchanged until the new iterator is consumed.

```rust
let numbers = vec![1, 2, 3, 4, 5];
let num_it = numbers.iter().map(|x| x * 2); // num_it is an iterator that yields doubled values, it ONLY applies the transformation when the iterator is consumed
```

### Collect Method

Exhausts the iterator and gathers the resulting values into a new collection type. It can return a variety of different collection types such as `Vec`, `HashMap`, `HashSet`, etc. The type of collection to collect into must be specified, either explicitly or via type inference.

```rust
let numbers = vec![1, 2, 3, 4, 5];
let squares: Vec<i32> = numbers.iter().map(|number: &i32| number * number).collect(); // squares is now a Vec<i32> containing [1, 4, 9, 16, 25]
// Notice that we must annotate the type of the collection we want to collect into, you can also do Vec<_> and let the compiler infer the type but the base type must be annotated. You can also use the turbofish .collect::<Vec<i32>>()
```

### Filter Method
Extracts a subset of values that satisfy a condition. It accepts a closure that returns a boolean value. Only the items for which the closure returns `true` are included in the new iterator.

```rust
let numbers = vec![1, 2, 3, 4, 5];
let even_numbers: Vec<i32> = numbers.iter().filter(|x| *x % 2 == 0).copied().collect(); // even_numbers is now a Vec<i32 containing [2, 4]
// **x % 2 == 0 is also valid, but automatic dereferencing of operators allows &i32s to be used in operators.
```

### Find Method
Returns the first element in the iterator that satisfies a condition. It returns an `Option` enum, which will be `Some(value)` if an element is found, or `None` if no such element exists.

```rust
let numbers = vec![1, 2, 3, 4, 5];
let first_even = numbers.iter().find(|&&x| x % 2 == 0); // first_even is of type Option<&i32>, it will be Some(&2)
```
