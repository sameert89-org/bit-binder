## Basic Comments

```rust
// line comments
/* block
	commment
*/
```
## Documentation Comments

### Inner Documentation Comments (`//!`)
These describe the item **they’re inside**, typically at the top of a crate or module.
Example: Documenting the entire crate:
```rust
//! This crate provides utilities for working with geometrical shapes.
```
Or at the start of a module:
```rust
mod math {
//! Math utilities 
}
```
### Outer Documentation Comments (`///`)

These document the **item that follows**, such as functions, structs, enums. Example:
```rust
/// Adds two numbers together.
///
/// # Examples
///
/// ```
/// let sum = add(2, 3);
/// assert_eq!(sum, 5);
/// ```
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```