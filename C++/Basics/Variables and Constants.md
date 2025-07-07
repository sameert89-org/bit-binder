*Variables* are used to bi8nd 'names' to memory locations because names are human friendly.

*Variables* must be declared before using due to C++ being a **static**
```cpp
int a; // Declaration type variable_name;
a = 5; // Initialisation variable_name = value;
```

### Naming Rules
- Can contain letters, numbers and underscore.
- Must begin with a letter or an underscore not number.
- Cannot use keywords.
- Case sensitive.
- Cannot redeclare in the same scope.

### Initialization
There are several ways to initialize variables, it also differs based on the type.
```cpp
int age; // uninitialized
int age = 21; // C-line initialization
int age(21); // constructor initialization
itn age{21}; // C++ 11 list initializer
```
### Scope
**Local Variables** Only accessible from the scope they have been declared in.
**Global Variables:** Accessed from anywhere, declared outside the scope usually at the top. They are ==Automatically init to zero==


## Naming Conventions

Below table summarizes general best practices.

|Item|Convention|Example|
|---|---|---|
|**Class/Struct**|UpperCamelCase|`DataProcessor`|
|**Function**|lower_snake_case|`calculate_sum()`|
|**Variable**|lower_snake_case|`current_index`|
|**Constant**|UPPER_SNAKE_CASE or kPrefix|`MAX_SIZE` or `kMaxSize`|
|**Member Variable**|`m_` prefix (optional)|`m_value`|
|**Namespace**|lower_snake_case|`namespace utils { }`|
|**Enum**|UpperCamelCase for type, UPPER_SNAKE_CASE for values|`enum Color { COLOR_RED, COLOR_GREEN };`|

## Data Types

#### Primitive Data Types
- Character types
- Integer types
- Floating point types
- Boolean types

> [!NOTE] Size and precision
> These are often platform/compiler dependent, a header file `climits.h` contains info about data types.


##### Character Types
Used to represent a single character 'A', 'X', '@'. Note the `''`, single quote as [delimiter](https://en.wikipedia.org/wiki/Delimiter)j

| Type Name  | Size/Precision         |
| ---------- | ---------------------- |
| `char`     | 1 byte, atleast 8 bits |
| `char16_t` | atleast 16 bits        |
| `char32_t` | atleast 32 bits        |
| `wchar_t`  | largest available      |

##### Integer Types
