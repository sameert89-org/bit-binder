Like every other language, Rust has Hashmaps and Hashsets.

## Hashmaps
A Hashmap is a collection of key-value pairs where each key must be unique.

### Declaration and Creation
```rust
use std::collections::{HashMap, HashSet};

let mut hashmap = HashMap::new(); // notice the mut keyword
hashmap.insert("key1", "value1"); // type inferred from first insert, or use turbofish

// Using the from function
let hashmap2: HashMap<&str, i32> = HashMap::from([
    ("one", 1),
    ("two", 2),
    ("three", 3),
]); // array of tuples
```

### Accessing and Modifying
```rust
// Accessing keys
let val = hashmap.get("key1"); // returns an Option enum
let val2 = hashmap["key1"]; // panics if key doesn't exist

// Keys implement the Hash trait

// Removing keys
hashmap.remove("key1"); // Returns an Option enum

// Length
println!("Length of hashmap: {}", hashmap.len());

// Entry and or_insert
let entry = hashmap.entry("key2").or_insert("default_value"); // Inserts if not exists
```

### Ownership
Inserting non-primitive types moves ownership to the Hashmap. Use references if needed, but ensure lifetimes.

```rust
let mut hashmap = HashMap::new();
let key = String::from("key1");
let value = String::from("value1");
hashmap.insert(&key, &value); // Inserting references
// key and value must live as long as hashmap
```

## Hashsets
A Hashset is a collection of unique values.

### Declaration and Creation
```rust
use std::collections::HashSet;

let mut hashset = HashSet::new();
hashset.insert("apple");
hashset.insert("banana"); // Will not insert duplicates
```

### Accessing and Modifying
```rust
// Check if contains
if hashset.contains("apple") { /* ... */ }

// Get method
let item = hashset.get("banana"); // Returns Option<&T>

// Remove
hashset.remove("apple"); // Returns bool depending on the value existence

// Length
println!("Length of hashset: {}", hashset.len());
```

### Set operations

```rust
// Union
let mut set1 = HashSet::from(["a", "b", "c"]);
let mut set2 = HashSet::from(["c", "d", "e"]);
let union_set: HashSet<_> = set1.union(&set2).cloned().collect();

// Intersection
let intersection_set: HashSet<_> = set1.intersection(&set2).cloned().collect();

// Difference & symmetric difference
let difference_set: HashSet<_> = set1.difference(&set2).cloned().collect(); //found in set1 but not in 2
let sym_diff_set: HashSet<_> = set1.symmetric_difference(&set2).cloned().collect(); // found in either 1 or 2 but not both

// Check Disjoint
let mut are_sets_disjoint = set1.is_disjoint(&set2); // returns true

// Is subset/superset
let is_subset = set1.is_subset(&set2); // returns false
let is_superset = set1.is_superset(&set2); // returns false

``````
### Ownership
Similar to Hashmaps, inserting moves ownership.


