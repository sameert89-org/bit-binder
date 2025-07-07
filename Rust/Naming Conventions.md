Below table neatly summarizes the naming conventions used in Rust.

|**Item Type**|**Convention**|**Example**|
|---|---|---|
|**Crate names**|lowercase, underscores|`my_crate`|
|**Module names**|lowercase, underscores|`network_utils`|
|**Function names**|snake_case|`parse_input()`|
|**Variable names**|snake_case|`user_id`|
|**Constant names**|SCREAMING_SNAKE_CASE|`MAX_RETRIES`|
|**Static variable names**|SCREAMING_SNAKE_CASE|`GLOBAL_CONFIG`|
|**Struct names**|PascalCase|`HttpRequest`|
|**Enum names**|PascalCase|`ColorType`|
|**Enum variant names**|PascalCase|`Red`, `Green`, `Blue`|
|**Trait names**|PascalCase|`Display`, `Iterator`|
|**Type alias names**|PascalCase|`ResultType`|
|**Generic type params**|UpperCamelCase, often single letters|`T`, `E`|
|**Lifetimes**|lowercase, prefixed with `'`|`'a`, `'static`|
|**Macros**|snake_case, end with `!`|`println!`, `vec!`|
|**Test functions**|snake_case, describe behavior|`should_parse_json()`