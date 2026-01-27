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

> [!INFO] FromIterator Trait
> The `FromIterator` trait is the counterpart to `IntoIterator`. It allows you to create a collection from an iterator. Many collections implement this trait, enabling you to use the `collect` method on iterators to gather values into a collection. It can also be called directly using `CollectionType::from_iter(iterator)`.
> ```rust
> let numbers = vec![1, 2, 3, 4, 5];
> let squares: Vec<i32> = numbers.iter().map(|x| x * x).collect(); // Using collect to gather squared values into a Vec
> let squares_direct: Vec<i32> = Vec::from_iter(numbers.iter().map(|x| x * x)); // Using FromIterator directly
> ```

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
### Any and All Methods
The `any` method checks if any element in the iterator satisfies a given condition, returning `true` if at least one element meets the criteria, and `false` otherwise. The `all` method checks if all elements satisfy the condition, returning `true` only if every element meets the criteria.

```rust
let even_numbers = vec![2, 4, 6, 8];
let every_even = even_numbers.iter().all(|&x| x % 2 == 0); // true
let has_odd = even_numbers.iter().any(|&x| x % 2 != 0); // false
```

> [!TIP] Predicates
> The closures passed to `filter`, `find`, `any`, and `all` are often referred to as *predicates* because they return a boolean value based on a condition.

### Copied and Cloned Methods
The `copied` method creates an iterator that yields copies of the values from the original iterator. This is useful when you have an iterator over references and want to obtain owned values. The `cloned` method works similarly but is used for types that implement the `Clone` trait.

```rust
let numbers = vec![1, 2, 3];
let copied_numbers: Vec<i32> = numbers.iter().copied().collect(); // copied_numbers is now a Vec<i32> containing [1, 2, 3]
let cloned_strings: Vec<String> = vec![String::from("a"), String::from("b")]
    .iter()
    .cloned()
    .collect(); // cloned_strings is now a Vec<String> containing ["a", "b"]
```

### `filter_map` Method
The `filter_map` method combines filtering and mapping into a single operation. It takes a closure that returns an `Option<T>`. If the closure returns `Some(value)`, the value is included in the new iterator; if it returns `None`, the value is excluded.

```rust
    let strings = vec!["42", "abc", "10", "hello", "7"];
    // Try to parse strings into integers
    // .parse().ok() returns Some(i32) if valid, None if it fails
    let numbers: Vec<i32> = strings
        .into_iter()
        .filter_map(|s| s.parse().ok())
        .collect();
    println!("{:?}", numbers); 
    // Output: [42, 10, 7]
```

### `flatten` Method
The `flatten` method is used to convert an iterator of iterators into a single iterator that yields all the items from the inner iterators. This is particularly useful when you have nested collections and want to iterate over all the elements in a flat manner.

```rust
let nested_vecs = vec![vec![1, 2], vec![3, 4], vec![5]];
let flat_vec: Vec<i32> = nested_vecs.into_iter().flatten().collect(); // flat_vec is now a Vec<i32> containing [1, 2, 3, 4, 5]
```

### `flat_map` Method
The `flat_map` method combines mapping and flattening into a single operation. It takes a closure that returns an iterator for each item in the original iterator. The resulting iterators are then flattened into a single iterator.

```rust
let words = vec!["hello world", "rust programming"];
let chars: Vec<char> = words
    .into_iter()
    .flat_map(|s| s.chars())
    .collect(); // chars is now a Vec<char> containing all characters from the words
println!("{:?}", chars); // Output: ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o',
```

### `enumerate` Method
The `enumerate` method adds an index to each item yielded by the iterator. It returns a new iterator that yields pairs of the form `(index, value)`, where `index` is the position of the value in the original iterator.

```rust
let fruits = vec!["apple", "banana", "cherry"];
for (index, fruit) in fruits.iter().enumerate() {
    println!("{}: {}", index, fruit);
}
```

### `partition` Method
This method is used to as the name suggests *"partition"* a collection based on some condition.

```rust
let numbers = vec![1, 2, 3, 4, 5];
let (evens, odds) : (Vec<i32>, Vec<i32>) = numbers.into_iter().partition(|x| x % 2 == 0); // The true condition goes to first item of the tuple
println!("{evens:?}, {odds:?}");
```

### `zip` Method
Combines two iterators together, returns an iterator of tuples with 2 elements, it only outputs until the shorter iterators is exhausted.

```rust
let f_name = vec!["Sue", "Malcolm"];
let l_name = vec!["Heck", "Murray"];

let full_names: Vec<String> = f_name.into_iter().zip(l_name).map(|(f, l)| format!("{f} {l}")).collect();

println!("{full_names:?}");
```

### `take` Method
The `take` method yields the first `n` elements of the iterator and then stops, returning a new iterator.

```rust
let numbers10 = vec![1, 2, 3, 4, 5];
let first_three: Vec<i32> = numbers10.iter().take(3).copied().collect(); // first_three is now a Vec<i32> containing [1, 2, 3]
```

### `skip` Method
The `skip` method skips the first `n` elements and returns a new iterator over the remaining elements.

```rust
let numbers11 = vec![1, 2, 3, 4, 5];
let without_first_two: Vec<i32> = numbers11.iter().skip(2).copied().collect(); // without_first_two is now a Vec<i32> containing [3, 4, 5]
```

### `rev` Method
The `rev` method reverses the order of the elements in the iterator.

```rust
let numbers12 = vec![1, 2, 3, 4, 5];
let reversed: Vec<i32> = numbers12.iter().rev().copied().collect(); // reversed is now a Vec<i32> containing [5, 4, 3, 2, 1]
```

### `step_by` Method
The `step_by` method returns an iterator that steps by the given amount, yielding every n-th element.

```rust
let numbers13 = vec![1, 2, 3, 4, 5, 6, 7, 8, 9];
let every_second: Vec<i32> = numbers13.iter().step_by(2).copied().collect(); // every_second is now a Vec<i32> containing [1, 3, 5, 7, 9]
```

### `fold` and `reduce` Methods
`fold`: Like Javascript `reduce`, it takes an accumulator and applies an operation to all elements of the iterator and returns the final value.

```rust
use std::collections::HashMap;

struct SupportStaff {
    day: String,
    employee: String,
}

fn main() {
    let earnings: [i32; 4] = [4, 7, 9, 13];

    let sum: i32 = earnings.into_iter().fold(0, |total, current| {
        println!("Total: {total}, current: {current}");
        total + current
    });

    println!("{sum}");

    let week: [SupportStaff; 3] = [
        SupportStaff {
            day: String::from("Monday"),
            employee: String::from("Brian"),
        },
        SupportStaff {
            day: String::from("Tuesday"),
            employee: String::from("Cam"),
        },
        SupportStaff {
            day: String::from("Wednesay"), // Note: Typo 'Wednesay' preserved from image
            employee: String::from("Walter"),
        },
    ];

    let map: HashMap<String, String> = week.into_iter().fold(HashMap::new(), |mut data, entry| {
        data.insert(entry.day, entry.employee);
        data
    });

    println!("{map:?}");
}
```
The accumulator could be anything, like in the above example its a hashmap.

`reduce` is very similar to it, the only difference being that it does not take an accumulator, the first element is supplied as the accumulator. It also returns an `Option`enum for the case where the iterator does not have any elements.

### `lines` method
Useful for file operations when using read_to_string, it returns an iterator over the lines of a string slice.

```rust
let contents = fs::read_to_string("file.txt")?;
for line in contents.lines() {
    println!("{}", line);
}
```

```rust

#### Consuming Adapters
The adapter methods return another iterator, there is one special category of adapter methods called *consuming adapters* that exhaust the iterator and return a final value instead of another iterator.

```rust
// sum
let numbers1 = vec![1, 2, 3, 4, 5];
let total: i32 = numbers1.iter().sum(); // total is 15
// product
let numbers2 = vec![1, 2, 3, 4];
let product: i32 = numbers2.iter().product(); // product is 24
// max
let numbers3 = vec![10, 20, 5, 30];
let max_value: Option<&i32> = numbers3.iter().max(); // max_value is Some(&30), this returns an Option because the iterator could be empty
// min 
let numbers4 = vec![10, 20, 5, 30];
let min_value: Option<&i32> = numbers4.iter().min(); // min_value is Some(&5), this returns an Option because the iterator could be empty
// count
let numbers5 = vec![1, 2, 3, 4, 5];
let count: usize = numbers5.iter().count(); // count is 5 // well this is a terrible example but this is used to count the number of elements in an iterator (or precisely till it exhausts)

// last
let numbers6 = vec![1, 2, 3, 4, 5];
let last_element: Option<&i32> = numbers6.iter().last(); // last_element is Some(&5), returns an Option because the iterator could be empty

// nth
let numbers7 = vec![10, 20, 30, 40, 50];
let third_element: Option<&i32> = numbers7.iter().nth(2); // third_element is Some(&30), returns an Option because the iterator could be empty or index out of bounds
// nth_last
let numbers8 = vec![10, 20, 30, 40, 50];
let second_last_element: Option<&i32> = numbers8.iter().nth_back(1); // second_last_element is Some(&40), returns an Option because the iterator could be empty or index out of bounds

// position
let numbers9 = vec![1, 3, 5, 7, 8, 9];
let position_of_eight: Option<usize> = numbers9.iter().position(|&x| x == 8); // position_of_eight is Some(4), returns an Option because the element might not be found, this gives the index of the first occurrence
```
