## Loop Loop
⚠️ Another because I said so syntax ahead-
```rust title="The loop keyword"
loop {
	println!("Infinite loop");
}
```

In the loop keyword you have to manually break out of the loop using `break` statement when you are done. There is also a `continue` statement.

```rust "break and continue in loops"
fn main() {
    for i in 1..10 {
        if i == 3 {
            continue;
        }
        if i == 7 {
            break;
        }
        println!("{}", i);
    }
}
```
>The loop loop can return a value as well, this is done using the break statement `break value_to_return;` This only works in the *loop* loop
## While Loop
Standard while loop nothing special.

```rust title="While loop"
let mut i = 0;
while i < 15 {
	i += 1;
	println!("{i}");
}
```

- Break and continue work the same way but unlike loop loop, it cannot return via break.

## For loop
The good ol' for-loop
```rust title="All for loop uses"
fn main() {
    // 1. Basic for loop over a range (exclusive end)
    println!("Basic range (1..6):");
    for i in 1..6 {
        println!("  {}", i); // Prints 1 to 5
    }

    // 2. Inclusive range (includes the end)
    println!("\nInclusive range (1..=6):");
    for i in 1..=6 {
        println!("  {}", i); // Prints 1 to 6
    }

    // 3. Iterating over an array or a vector
    let fruits = ["Apple", "Orange", "Banana"];
    println!("\nArray iteration:");
    for fruit in fruits {
        println!("  {}", fruit); // Prints each fruit
    }

    // 4. Index-based iteration over an array
    let colors = ["red", "green", "blue"];
    println!("\nIndex-based iteration:");
    for i in 0..colors.len() {
        println!("  The color name is {}", colors[i]); // Uses index to access element
    }

    // 5. Using enumerate to get (index, value) pairs
    let items = ["x", "y", "z"];
    println!("\nEnumerate for index and value:");
    for (index, value) in items.iter().enumerate() {
        println!("  {}: {}", index, value); // Prints index and value
    }

    // 6. Reverse iteration (descending order)
    println!("\nRange reversed (1..6).rev():");
    for i in (1..6).rev() {
        println!("  {}", i); // Prints 5 to 1
    }

    // 7. Stepping by intervals (e.g., every 2nd number)
    println!("\nRange with step_by(2) (0..10).step_by(2):");
    for i in (0..10).step_by(2) {
        println!("  {}", i); // Prints 0, 2, 4, 6, 8
    }
}
```

Read More: [[Recursions]]
