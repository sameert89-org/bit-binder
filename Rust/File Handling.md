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

// If there are multiple lines, you can use the lines() method to iterate over them
for line in file_contents.lines() {
    println!("{}", line);
}
```

### Collecting Command Line Arguments
This is done using the `std::env` module.

```rust
use std::env;

fn main() {
    let args: Args = env::args(); // returns an Args struct, it implements Iterator trait
    // The first value is always the program name
    for arg in args {
        println!("{}", arg);
    }
}
```

### Reading Directory
`read_dir` in the `std::fs` module is used to read the contents of a directory.

```rust

use std::fs;
use std::fs::DirEntry;
use std::io;
use std::io::Error;

fn main() -> io::Result<()> {
    for entry_result: Result<DirEntry, Error> in fs::read_dir(path: "./")? {
        match entry_result {
            Ok(entry: DirEntry) => println!("{:?}", entry.path()),
            Err(error: Error) => {
                eprintln!("Could not read entry: {error}");
            }
        }
    }

    Ok(())
}
```

