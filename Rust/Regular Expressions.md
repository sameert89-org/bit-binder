The standard way to work with regular expressions in Rust is through the `regex` crate.

To use `regex`, add it to your `Cargo.toml`:

```toml
[dependencies]
regex = "1.12.2"  # Check https://crates.io/crates/regex for the latest version
```

> *Haystack:* The main collection of data you want to search through.
> *Needle:* The pattern you are searching for within the haystack.

### `find` & `find_iter` methods

> *Raw string literals:* In Rust, raw string literals are defined using `r#"..."#` syntax, allowing you to include characters like backslashes and quotes without needing to escape them (This includes multi line content as well). The number of `#` symbols must be same on both sides. Similarly there are raw strings defined as `r"\nThis \n will be interpreted including escape sequences."`.

The *needle* is defined using the raw string or raw string literal syntax to avoid escaping backslashes.

```rust
use regex::Regex;

fn main() {
    let needle = Regex::new(r"to").unwrap(); // Returns a Result enum because the pattern may be invalid

    let mut haystack = "To know tomorrow you first need to know today.";

    let first_occurrence = needle.find(haystack); // This returns an Option<Match> enum, Match contains the start and end indices of the match
    println!("{:?}", first_occurrence); // Some(Match { start: 3, end: 5, string: "to" })

    // this has .start(), .end() and .as_str() methods to get more info about the match

    let all_occurrences: Vec<_> = needle.find_iter(haystack).collect(); // This returns an iterator of all matches

    // capture groups
    // A capture group is a way to extract specific parts of a matched string using parentheses in the regex pattern.
    // These can be saved and referenced later, either for matching or for replacement.
    let needle2 = Regex::new(r"(\w+) to (\w+)").unwrap();
    let mut haystack2 = "I want to go to the park.";
    for cap in needle2.captures_iter(haystack2) { // there is captures() method as well it returns which captures the first match
        println!("Full match: {}", &cap[0]); // Full match: want to go
        println!("First group: {}", &cap[1]); // First group: want
        println!("Second group: {}", &cap[2]); // Second group: go
    }

    // replacing occurences
    let result = needle.replace_all(haystack, "2");
    println!("{}", result); // T2 know 2morrow you first need 2day.

    // example of replace with capture groups
    let result2 = needle2.replace_all(haystack2, "$2 from $1"); // $n references the nth capture group (1 indexed)
    // you can customize the name of the capture groups as well using (?P<name>...) or just (?<name>) syntax and reference them using $name
    println!("{}", result2); // I go from want the park.
} 
```

## Regex Cheatsheet
![[Pasted image 20260117131125.png]]

### Special Observations
- Capital letters often represent the inverse for example `\w & \W`
- \w includes all *alphanumeric* words.
**Read More**: [Regex 101](https://regex101.com/) is a great online tool to test and debug your regular expressions.
