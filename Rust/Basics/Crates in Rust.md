A crate is a *unit of compilation* in rust, simply put it can be called as a package of rust code.

There are two types of crates in rust:
1. **Binary Crates:** Crates that contain executable code. They contain a single `main.rs` with a `main()` method.
2. **Library Crates:** Crates that don't contain executable code and are used to ship reusable code by linking them to other crates. Does not have a `main` method.

> [!INFO] Dual Crates?
> A crate can ship as both a *binary* and a *library* crate. In such cases the `add` command links the library portion of the crate, whereas the `install` command installs the executable.

## Crates.io
Like `nuget` & `npm` there is a central repository for rust *crates*. Below are some useful commands -
```bash
cargo add crate_name # adds the dependency of the crate_name in current package, ONLY works with library crates
cargo install crate_name # installs the executable globally on your machine 
```

> [!DANGER] crates.io: A Cautionary Tale
> Cargo install, installs rust crates globally on your machine, although the rust crates are *audited* but there has been multiple incidents of [fake crates](https://www.reddit.com/r/rust/comments/1605fqj/rust_malware_staged_on_cratesio/). Better be safe with this command. Also there was some [Rust Drama](https://news.ycombinator.com/item?id=42972525) where some popular package maintainers self deprecated their packages over a fight.


See Also: [[Modules in Rust]]