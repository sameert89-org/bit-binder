## What are Modules
Modules are subdivisions inside *crates* which are used to organize code. Below is an example folder structure

```ruby
my_dual_crate
 ├── src
 │   ├── main.rs     ← crate root (binary)
 │   ├── lib.rs     ← crate root (library)
 │   └── math.rs    ← module
```

## What are Crates

A crate is a *unit of compilation* in rust, simply put it can be called as a package of rust code. A crate is the smallest amount of code that the Rust compiler considers at a time.

There are two types of crates in rust:
1. **Binary Crates:** Crates that contain executable code. They contain a single `main.rs` with a `main()` method.
2. **Library Crates:** Crates that don't contain executable code and are used to ship reusable code by linking them to other crates. Does not have a `main` method.

> [!INFO] Dual Crates?
> A crate can ship as both a *binary* and a *library* crate. In such cases the `add` command links the library portion of the crate, whereas the `install` command installs the executable. The binary crate can use the library crate internally. The modules must be public and declared in the `lib.rs` file for it to work.

Aside from this, a package can have multiple binary crates but only one library crate. These binary crates must be placed inside the `src/bin` folder. Each of the rs files here will create a separate binary.

## Crates.io
Like `nuget` & `npm` there is a central repository for rust *crates*. Below are some useful commands -

```bash
cargo add crate_name # adds the dependency of the crate_name in current package, ONLY works with library crates
cargo install crate_name # installs the executable globally on your machine 
```

> [!DANGER] crates.io: A Cautionary Tale
> Cargo install, installs rust crates globally on your machine, although the rust crates are *audited* but there has been multiple incidents of [fake crates](https://www.reddit.com/r/rust/comments/1605fqj/rust_malware_staged_on_cratesio/). Better be safe with this command. Also there was some [Rust Drama](https://news.ycombinator.com/item?id=42972525) where some popular package maintainers self deprecated their packages over a fight.

## What are packages
A packages is a collection of one or more crates.

### The `cargo init` and `cargo new` commands

```rust
cargo init

cargo new project_name
```

- The main difference between the two commands is that `cargo new` creates a new directory with the project name and initializes the project inside it, whereas `cargo init` initializes a new cargo project in the current directory.
- Cargo looks for `src/main.rs`, if it exists Rust infers that is a binary crate.
- If Cargo finds `src/lib.rs`, Rust infers that is a library crate.

### Declaring a module

```rust
mod inventory  {
    const FLOOR_SPACE: i32 = 10000;
    pub const MANAGER: &str = "Lalit"; // Notice the pub keyword

    #[derive(Debug)]
    enum ProductCategory{
        Ladder,
        Manner
    }

    #[derive(Debug)]
    struct Item {
        name: String,
        category: ProductCategory,
        quantity: u32
    }

    fn talk_to_manager(){
        println!("Hey, {MANAGER}, how's your coffee");
    }
}

fn main() {
    println!("The manager is {}", inventory::MANAGER);
}
```

- By default all items in a module are private. They are enclosed in their own namespace. We use the `pub` keyword to make them public.
- Modules can be declared in separate files. In the above example the 'inventory' module is a part of the main binary crate. For example, to turn the inventory module into a separate file, create a file named `inventory.rs` in the `src` directory and move the module code there (just the code not the whole mod name {} syntax. Then, in `main.rs`, you can declare the module with `mod inventory;`. Or create a folder with the name inventory and inside it create a file named `mod.rs`.
- `main.rs` and `lib.rs` are special files. They are the root of binary and library crates respectively.

- **Read More**: [[Structs#^8be5 | Structs & Field Accessibility]]

### Sub-modules
Modules can be nested inside other modules, these are called sub-modules. Either in the same file or in a file inside the parent module's folder or a folder inside it, you get the idea. When declaring sub-modules you need to use `pub` if you want to access them from outside the parent module.

> [!NOTE] The `crate` keyword
> When you have too many nested modules, it can get tedious to use the full path from the root of the crate. The `crate` keyword allows you to start from the root of the crate. For example
> ```rust
> crate::inventory::talk_to_manager();
>```
> This means the search starts from the root of the crate, useful when referring submodules inside other modules.

When using fields from nested sub-modules it gets tedious to type out long paths over and over, Rust provides the `use` keyword to bring paths into scope.

```rust
use inventory::ProductCategory;
use inventory::{Item, ProductCategory}; // for multiple items
use inventory::products::{self, Toothpaste}; // use self to bring the parent module into scopebest cheapest general purpose model right now
use std::collections::*; // bring everything from the module into scope using the glob operator
pub use std::fmt; // re-exporting the module, useful for library crates to expose their submodules
```

But in case of conflicts, it is recommended to use the full path. There is also the `as` keyword to rename imports.

```rust
use inventory::ProductCategory as PC;
```

> [!NOTE] The `super` keyword
> The `super` keyword allows you to access the parent module from a sub-module. The sub-module can access non-public items from the parent module.


## External Crates
These are dependencies, these can be specified in the `Cargo.toml` file. During build cargo will download it from **crates.io**. Below is a sample `Cargo.toml`.

```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.8.5"
```

> [!TIP] General convention for ordering mod declarations
> `mod` declarations > rust standard library imports > external crate imports > internal crate imports.

