## Declaring Variables
Below is how you declare a variable in rust
```rust
let my_var = 50; // compiler auto deduces type 'i32' in this case
```
Rust variables are *immutable* by default, meaning once assigned they cannot be re-assigned.
```rust
my_var = 90; // will throw and error during compilation
let mut myMutableVar = 50; // This defines a mutable variable which CAN be re-assigned
```

## Shadowing
Rust supports *shadowing* (surprise, surprise!), meaning a variable can be redeclared in the same scope and the earlier declaration is invalidated.

```rust
let my_var = 50; // i32 as of now
let my_var = "text"; // &str now
// mut or non mut does not matter
```

Related: [[Naming Conventions]]