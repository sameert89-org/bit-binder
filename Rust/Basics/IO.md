## `println!` interpolation

The `println!` macro supports interpolation using curly braces,
```rust
var my_age = 24;
var my_name = "Sameer";
println!("My age is {}", my_age); // outputs My age is 24
println!("My age is {my_age}"); // works the same way how cool is that
println!("My age is {0} & My Name is {1}, My Name was always {1}, I turned {my_age} last year", my_age, myname); // positional arguments start from 0 and can be reused in the target string
```
