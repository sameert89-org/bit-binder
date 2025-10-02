## `println!` interpolation

The `println!` macro supports interpolation using curly braces,
```rust
var my_age = 24;
var my_name = "Sameer";
println!("My age is {}", my_age); // outputs My age is 24
println!("My age is {my_age}"); // works the same way how cool is that
println!("My age is {0} & My Name is {1}, My Name was always {1}, I turned {my_age} last year", my_age, myname); // positional arguments start from 0 and can be reused in the target string
```
### The Format Specifier
`println!` macro provides an option of format specifiers which control how certain data will be printed. Works with all interpolations, just follow with the specifier.

Examples
```rust
let name = "Alice";
let age = 30;
println!("{} is {} years old.", name, age);

println!("{:>5}", 42);       // right-align
println!("{:<5}", 42);       // left-align
println!("{:^7}", 42);       // center-align

println!("{:08.2}", 3.1415); // total 8 chars incl decimal = pad + float precision → 00003.14

println!("{name} likes {lang}", name = "Bob", lang = "Rust");

let arr = [1, 2, 3];
println!("{:?}", arr);       // Debug print

```
There are a lot of these specifiers 

|Specifier|Meaning|Example|
|---|---|---|
|`{}`|Display (uses `Display` trait)|`println!("{}", 42)`|
|`{:?}`|Debug formatting (`Debug` trait)|`println!("{:?}", vec![1, 2, 3])`|
|`{:#?}`|Pretty Debug (multi-line)|`println!("{:#?}", some_struct)`|
|`{:#x}`|Lower hex, with prefix (`0x`)|`println!("{:#x}", 255)` → `0xff`|
|`{:.precision}`|Floating-point precision|`println!("{:.2}", 3.14159)` → `3.14`|
|`{:width}`|Minimum width (pads with spaces)|`println!("{:5}", 42)` → `' 42'`|
|`{:0width}`|Pad with zeros|`println!("{:05}", 42)` → `00042`|
|`{:<}`|Left-align|`println!("{:<5}", "hi")` → `hi`|
|`{:>}`|Right-align|`println!("{:>5}", "hi")` → `hi`|
|`{:^}`|Center-align|`println!("{:^5}", "hi")` → `hi`|
|`{name}`|Named argument|`println!("{name}", name = "Rust")`|
