## Process Module and `exit` function

exit function is equivalent to os level exit call. No cleanup happens, no buffers are flushed, no destructors called, just a flat crash.

```rust
use std::process;
fn main() {
    process::exit(1);
}
```

Read More: [[Macros#^panic_macro|panic macro]], [[Macros#^eprintln_macro|eprintln! macro]]

## The try `?` Operator
The `?` operator is a shorthand for propagating errors in Rust. It can be used on functions that return a `Result` type. If the result is `Ok`, it unwraps the value; if it's `Err`, it returns the error from the current function.

```rust
use std::fs::File;
use std::io::{self, Read};
fn read_file_contents(path: &str) -> io::Result<String> {
    let mut file = File::open(path)?; // If this fails, the error is returned
    let mut contents = String::new();
    file.read_to_string(&mut contents)?; // If this fails, the error is returned
    // it can be chained as well
    File::Open(path)?.read_to_string(&mut contents)?;
    Ok(contents) // If everything is successful, return the contents
} 
```

It also works on the Option enum, returning `None` if the value is `None` early & returning the unwrapped value if `Some`.

```rust
fn get_first_char(s: &str) -> Option<char> {
    let first_char = s.chars().next()?; // If there is no first char, return None
    Some(first_char)
}
```
