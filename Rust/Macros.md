In Rust, **macros** are a powerful metaprogramming feature that let you write **code that writes code**. They allow you to define patterns and generate code at compile time, which can reduce boilerplate, improve readability, or enable complex functionality.


> [!INFO] Metaprogramming
> Concept in computer programming where, a program can treat other programs as input data

There are 3 kinds of macros in rust:

### Declarative Macros

The most straight forward macros

```rust
macro_rules! say_hello { // Macros are created using macro_rules! macro
    () => {
        println!("Hello!");
    };
}

fn main() {
    say_hello!(); // Prints "Hello!"
}
```

### Procedural Macros
These are more powerful and flexible, and work on Rust code as input (AST manipulation). They're like compiler plugins which generate code from macros.

```rust
use proc_macro;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
}
```

## Common Macros

#### `dbg!` macro
It prints the value of an expression along with the file name and line number where it’s used.
```rust
fn main() {
    let a = 2;
    let b = dbg!(a * 3) + 1;

    dbg!(b);
}

/* Output
[src/main.rs:4] a * 3 = 6
[src/main.rs:6] b = 7
*/
```

#### `unreachable` macro
Can be passed written in the arms of a conditional where you are **sure** that the control won't reach to silence the return requirements by the compiler
```rust title="Example"
fn describe_day(day: u8) -> &'static str {
    match day {
        1..=5 => "Weekday",
        6 | 7 => "Weekend",
        _ => unreachable!("'day' should be between 1 and 7"),
    }
}

fn main() {
    println!("{}", describe_day(2)); // Weekday
    println!("{}", describe_day(6)); // Weekend
    // println!("{}", describe_day(8)); // Panics with message
}
```
#### `panic` macro
Crash the program, well its not a crash since the cleanup is done by unwinding the stack.

```rust
panic!(":(");
```
^panic_macro

#### `format!` macro
Creates a `String` using interpolation

```rust
let name = "Alice";
let greeting = format!("Hello, {}!", name);
println!("{}", greeting); // Prints "Hello, Alice!"
```

all `println!` tricks are applicable in format! as well.

^format_macro

#### `eprintln!` macro
Prints to standard error

```rust
eprintln!("An error occurred: {}", "File not found");
```
^eprintln_macro
