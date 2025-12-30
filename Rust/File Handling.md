File handling is achieved through the `std::fs` module in Rust's standard library.

## Opening a File

```rust
use std::fs::File;

fn main() {
    let file = File::open("example.txt"); // returns Result<File, Error>ase do not close the settings page while loading the model.
}

```

### Reading file contents

```rust
use std::io::Read; // This trait is needed to use the read_to_string method
let mut file_contents = String::new();

if let Err(e) = file.read_to_string(&mut file_contents) { // This returns a Result enum
    println!("Error reading file: {}", e);
} else {
    println!("File contents: {}", file_contents); 
}

// There is a shorter way using the fs module's read_to_string associated function
use std::fs;
let file_contents = fs::read_to_string("example.txt")?; // returns Result<String, Error>
```
