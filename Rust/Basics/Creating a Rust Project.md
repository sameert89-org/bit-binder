The standard way to do this is using *cargo*.
```bash
cargo new project_name
```
This command:
- Creates a folder named `hello_world`
- Auto initializes a git repository inside that folder
- Creates an `src` subfolder with a main.rs file.
- Creates a `Cargo.toml` file for library and version info.

The content of `main.rs` looks like:

```rust
fn main() {
    println!("Hello, world!");
}
```
This command actually creates a so-called *binary* crate. See [[Crates in Rust]]


## Compiling and Running Programs
There are a couple of ways of doing this:
### rustc
```bash
rustc main.rs
```
This produces an executable that then can be run normally.

### cargo
The standard way to go for projects
```bash
cargo build # builds and produces a binary which needs to be separately executed
cargo run # build and run in single step
cargo check # checks the program whether it can be compiled, usually faster but IDEs do this job most of the time
cargo clean # removes all old compiled objects and binaries
```

> [!INFO] Build Flags
> By default the cargo commands do a `debug` build of the program, which is bulky non optimized version useful for debugging and sifting through instructions. The `build` and `run` command accept a build flag which can be used to change the target executable `cargo build --release`. There are several other build flags in rust, can be found [here](https://doc.rust-lang.org/cargo/commands/cargo-build.html)

> [!INFO] Built in Autoformatting
> `rustfmt file_name` can be used to auto format a rust file, `cargo fmt` does the same thing for the whole project.

