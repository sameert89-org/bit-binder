Data types in Rust are divided into 2 broad categories:

## Scalar Data Types
These data types only hold 1 value. There are 4 scalar types- integers, Booleans, floating point numbers & characters. These scalar types are subdivided into further types.

| **Scalar Data Type**      | **Description**                      | **Common Subtypes**                                                                                       | **Example Values**   |
| ------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------- |
| **Integer**               | Whole numbers without decimal points | `i8`, `i16`, `i32`, `i64`, `i128`, `isize` (signed) `u8`, `u16`, `u32`, `u64`, `u128`, `usize` (unsigned) | `-42`, `0`, `255`    |
| **Boolean**               | Represents truth values              | `bool`                                                                                                    | `true`, `false`      |
| **Floating Point Number** | Numbers with decimal points          | `f32`(6-9 digits precision), `f64`(default, 15-17 precision)                                              | `3.14`, `-0.001`     |
| **Character**             | A single Unicode character           | `char`                                                                                                    | `'a'`, `'😊'`, `'9'` |

> `isize` & `usize` are platform dependent for example $size = 32$ for 32 bit architecture. 
> There is no concept of *truthy* and *falsy* values in rust, there is only boolean which is either `true` or `false`


```rust
int my_variable: u8 = 15;
int my_float = 15.0f32
```

> [!INFO] Numerical Representation
> Like other languages, Rust provides syntax to make numeric values more readable, for example- you can have underscores `_` between numbers anywhere and rust will ignore those, `100_000`. There is also a scientific notation- `let c = 6.02e23;    // Avogadro's number-ish (f64)`

## Compound Types

These types store more than 1 value. There are 2 primitive compound types **Tuples & Arrays**. 

### Arrays
^arrays
Fixed size collection of *homogenous* data.
```rust
let myArray: [f32; 3] = [14.023,15f32,16.2342]; // Array of type f32 and length 3
// All elements can be initialized to the same value.
let ys: [i32; 500] = [0; 500];
```
Important information about arrays:
- Like all other variables, they must be initialized while defining.
- There are *syntactic sugars* for initializing such as `[0;5]` initializes a 5 element array with all elements having value zero.
- Access is done by index operator like other languages `my_array[0]`
- `len()` method is used to get the length.
- All data is by default immutable until the array itself is made mutable.

### Tuples
Simple, Fixed-Size & Heterogenous collections. 
```rust
let person = ("Alice", 30, true); // &str, i32, bool
let employee: (&str, i32, f64) = ("Bob", 45, 3.14);
let single = (5u32,); // Tuple with one element requires a comma to distinguish from plain parenthesis
```
*Accessing elements:*
```rust
let t = ("hi", 5, 'c');
println!("{}", t.0); // By index
let (greeting, number, ch) = t; // By destructuring
```


> [!NOTE] Unit Tuple 
> A tuple with no members `()`, this is the default return type of functions in case it is not specified implicitly or explicitly.

## Strings
These are non-primitive compound types. There are basically three main strings you need to know about.

- **String:** From the standard library, mutable objects which store collection of characters, created as `String::from("Hello") or "Hello".to_string()` 
- **String Literals:** Immutable objects stored neither in the [[Stack and Heap|Stack or the Heap]] but baked in the binary, rust uses *interning* on them. The above examples to create a `String` use literals as base. They have internal type of `&'static str`, sometimes also referred to as *slices*.
- **&str:** Immutable reference to a UTF-8 string  which is either a literal(the above) or a part of `String`.

Up Next: [[Type Casting]]
### String
This is the juice of how you use strings in rust. This section covers it in more detail.
#### Append to String using `push_str` function
This function is used to append data to the String. String characters are stored as *contiguous* memory, so if the heap doesn't have enough capacity in that stack pointer location, a new heap memory is found and the address of the pointer is auto updated.

```rust title="push_str example"
let mut name = String::from("Sameer");
name.push_str(" Trivedi");
```

## Slices
These are applicable for both Arrays and Strings

```rust title="Slices example" hl=11,16
// Heap allocated string 
let my_string = String::from("hello_world");
let my_slice: &str = &my_string[0..3];
let my_string_from_slices = my_slice.to_string();
// String slices always have same type &str, no matter they were derived from a literal or a String
let mut my_string = String::from("hello_world");
let my_mutable_slice = &mut my_string[0..4]; // Does not work with literals though, only slices of Strings are mutable, those also don't have the String methods, making them very limited
let mut my_array = [1,2,3];
let my_array_slice = my_array[0..1]; // has the full array logic, i.e you can modify an index if you want

// Interesting Observation
 let test = {
        let test = "sims";
        test
    };
    println!("{test}"); // Not out of scope, since &'static str and its slices are baked into the binary there no dangling pointer
```


> [!WARNING] Range slices are not based on indices
> The range `x..y` might seem like it will give slice starting from index x till y. This is mostly true, but the `x` and `y` are not indexes, but are byte positions, if the character occupies more than one bytes, then rust will panic at runtime, since slicing those characters is not possible. However for `Arrays` it is based on index 🙈. Further more you cannot access an index directly from a `String`, you must create a slice even for a single character `my_string[0..1]`.


> [!INFO] Deref Coercion
> Take a look at the following code:
> ```rust
> fn greet(name: &str) {
>    println!("Hello, {}!", name);
> }
> fn main() {
>    let owned_name = String::from("Alice");
>    let borrowed_name = "Bob";
>    greet(&owned_name);    // &String → &str (deref coercion)
>    greet(borrowed_name);  // &str → &str (no conversion)
>    }
> ```
> The function greet takes &str, but accepts both &String and &str arguments thanks to Rust's automatic deref coercion. When you pass &owned_name (which is &String), Rust automatically converts it to &str because String implements `Deref<Target = str>`.

## Operations

### String Concatenation

```rust
// Using push_str
let mut s1 = String::from("Hello, ");
s1.push_str("world!");

// Using push to add a single character
s1.push(' ');

// Using + operator
let s2 = String::from(" How are you?");
let s3 = s1 + &s2; // Note: s1 is moved here and can no longer be used
```

### Trimming Strings

```rust
// Trim (removes leading and trailing whitespace)
let s4 = String::from("   Trim me   ");
let trimmed = s4.trim(); // "Trim me"
let left_trimmed = s4.trim_start(); // "Trim me   "
let right_trimmed = s4.trim_end(); // "   Trim me"
```

### Case Conversion

```rust
let s5 = String::from("Hello, World!");
let upper = s5.to_uppercase(); // "HELLO, WORLD!"
let lower = s5.to_lowercase(); // "hello, world!"
```

### Replace

```rust
let s6 = String::from("Hello, World!");
let replaced = s6.replace("World", "Rust"); // "Hello, Rust!"
```

### Split

Split returns a `Split<&str>` iterator

```rust
let s7 = String::from("red blue")
let parts: Vec<&str> = s7.split(' ').collect(); // ["red", "blue"]
```

Read More: [[Macros#^format_macro|Format Macro]]
