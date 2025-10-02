A *special* type that represents a group of constants.

```rust title="Enums in Rust"

enum Color{
    Red,
    Blue,
    Yellow,
    Green
}

let treeColor: Color = Color::Green;
```

## Storing data in enums
Rust enums are powerful; each variant can store different types and amounts of data.

```rust
enum Message {
    Quit,              // Unit variant, no data
    Move { x: i32, y: i32 },  // Struct variant with named fields
    Write(String),     // Tuple variant with one anonymous field
    ChangeColor(i32, i32, i32),  // Tuple variant with multiple fields
}
```

- **Unit variants** like `Quit` store no data.
- **Tuple variants** like `Write` or `ChangeColor` hold anonymous data.
- **Struct variants** like `Move` have named fields for structured data.

>[!NOTE] About memory allocation
> The amount of memory rust allocates for a struct is `>= largest_size_among_all_fields`, when creating the struct it atleast allocates this much. They live on heap as expected.


## Enums and the `match` expression
The match expression becomes very powerful when used with enums, since rust checks that all possible values of that enum must be covered in the match statement, below is an example: 
```rust
enum Color {
    Red,
    Green,
    Blue,
}

fn main() {
    let color = Color::Red;
    match color {
        Color::Red => println!("Red"),
        Color::Green => println!("Green"),
        Color::Blue => println!("Blue"),
    }
}
```

