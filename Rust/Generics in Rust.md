Generics are abstract stand-ins for concrete types. You define them using angle brackets `<>`

```rust title="Declare basic generic types"
struct Point<T> {
    x: T,
    y: T,
}

let integer = Point { x: 1, y: 2 };
let float = Point { x: 1.1, y: 2.2 };
```
