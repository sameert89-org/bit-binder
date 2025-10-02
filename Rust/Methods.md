> *Methods are functions that are defined on types*

Below is an example on an integer and an `&str`.

```rust
let my_var: i32 = -15;
println!("The absolute value is: {}", my_var.abs()); // built-in method that returns the modulus of the integer.
let s = "hello";
println!("{}", s.len());  // method on &str
```

> [!WARNING] Methods can't be called on inferred type variables.
> You must explicitly mention the type of the variable using `:` to be able to call methods, otherwise rust throws an *ambiguous type* error and program fails to compile.

We can define custom methods on types, but *only the types we create*. It does not work on built in types.

```rust
struct Circle {
    radius: f64,
}

impl Circle {
    // Method: takes self by reference
    fn area(&self) -> f64 {
        3.1415 * self.radius * self.radius // don't use magic numbers kids 🔫
    }

    // Associated function: doesn't take self like Static
    fn new(radius: f64) -> Self {
        Circle { radius }
    }
}

fn main() {
    let c = Circle::new(5.0);    // associated function (like a constructor)
    println!("Area: {}", c.area());  // method call on instance
}
```
