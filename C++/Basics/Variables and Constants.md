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
> These are often platform/compiler dependent, a header file `climits.h` and `cfloat.h` contains info about data types. There is also the handy  `sizeof` method, and bunch of predefined constants `INT_MIN, INT_MAX, CHAR_MIN` etc.


##### Character Types
Used to represent a single character 'A', 'X', '@'. Note the `''`, single quote as [delimiter](https://en.wikipedia.org/wiki/Delimiter)j

| Type Name  | Size/Precision         |
| ---------- | ---------------------- |
| `char`     | 1 byte, atleast 8 bits |
| `char16_t` | atleast 16 bits        |
| `char32_t` | atleast 32 bits        |
| `wchar_t`  | largest available      |
##### Integer Types

| Type Name           | Size/Precision  |
| ------------------- | --------------- |
| un/signed short int | atleast 16 bits |
| un/signed int       | 16              |
| un/signed long int  | 32              |
| un/signed long long | 64              |

*Note: long long is short for long long int*

Read About: [[Signed vs Unsigned Data Types]]

*Note:* `char` can also store `int`, negative and positive


> [!INFO] Better representing values
> C++14 onwards we have support for better representing numbers, for example the number representing money can have tick marks in them to increase readability, for example 1 million can be written as`int money = 1'000'000;` Similarly for scientific notations we have `unsigned long long val = 2.7e25` which is same as $2.7\times10^{25}$ 


#### Floating Point Type(s)
- User to represent non integer numbers
- Consists of 2 things *mantissa* and the *exponent* $$
[
\underbrace{6.63}_{\textit{Mantissa}} \times \underbrace{10^{-34}}_{\textit{Exponent}}
]$$
- The precision is the number of digits in mantissa (compiler dependent)

#### Boolean Type
0 = false
everything else is truthy.


> [!NOTE] `sizeof` operator
> This operator determines the size in bytes of variable/type `sizeof(int)`;

#### Enum Type
Enumerations are very helpful to provide verbose representations of reused integral values.
```cpp
enum Color {
    RED, //internally stored as 0
    GREEN, // 1
    BLUE = 500 // explict value
};
```
However these leak into corresponding scope where they are declared, C++11 enum classes help with that.

```cpp
enum class Direction {
    North,
    South,
    East,
    West
};
// Used as
auto dir = Direction::North;
```


# Constants
Like Variable, constants:
- Have a name
- Occupy storage
- usually typed
- their value cannot change once declared

## Types of constants

### Literal constants

```cpp
// Literal Constants
int x = 12; // This 12 is a literal constant
/* Integer Literal constants
12 - integer
12U - uint
12L - long int
12LL - long long int

Floating Point Literal Constants
12.1 - double
12.1f - float
12.1L - long double

Character Literal Constnats
\n - newline
\t - tab
\r - return
\b - backspace
\' - single quote
\" - double quote
\\ - backlash
*/
```

### Declared constants

```cpp
 const double pi {3.1415926}; // must be initialized while declaring
```
###  Defined Constants

Defined using the `define` directive

```cpp
#include <iostream>

// Simple macro
#define PI 3.14159

// Object-like macro
#define MAX_COUNT 100

// Function-like macro
#define SQUARE(x) ((x) * (x))

// Multi-line macro
#define PRINT_SUM(a, b)         \
    do {                        \
        std::cout << (a + b);   \
    } while(0)

// Conditional compilation
#define DEBUG

// Stringizing operator
#define TO_STRING(x) #x

// Token pasting operator
#define MAKE_VAR(name, num) name##num

// Undefining a macro
#define TEMP_MACRO 123
#undef TEMP_MACRO

// Include guard simulation (normally in header files)
#ifndef MY_HEADER_H
#define MY_HEADER_H
#define VERSION "1.0"
#endif

int main() {
    std::cout << "PI: " << PI << std::endl;
    std::cout << "Square of 4: " << SQUARE(4) << std::endl;

    int x = 5, y = 7;
    std::cout << "Sum: ";
    PRINT_SUM(x, y);
    std::cout << std::endl;

#ifdef DEBUG
    std::cout << "Debug mode enabled" << std::endl;
#endif

    std::cout << "Macro as string: " << TO_STRING(Hello World) << std::endl;

    int MAKE_VAR(var, 1) = 42; // Expands to int var1 = 42;
    std::cout << "var1: " << var1 << std::endl;

    std::cout << "Version: " << VERSION << std::endl;
    return 0;
}

```
### Enumerated constants

```cpp
enum Fruits { Apple, Orange, Kiwi }; // implicitly numbered 0, 1, 2 unless specified using '='
Fruits favorite_fruit = Apple; 
```

### Constant Expressions
**constant expressions** are expressions that can be **evaluated at compile time**.

```cpp
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : (n * factorial(n - 1));
}

static_assert(factorial(5) == 120, "Factorial failed!");
```


> [!WARNING] Variable-Length Arrays (VLAs) Are Not Standard**
>In C++, writing code like:
>`int n; std::cin >> n; int arr[n]; // ❌ Not valid in standard C++`
> is **not standard-compliant**, even though it often **compiles on GCC/Clang**. These compilers support **Variable-Length Arrays (VLAs)** as a **non-standard extension** (borrowed from C99), but:
> - 🚫 VLAs are **not part of any C++ standard** (from C++98 to C++23).
> - 🛑 **MSVC does not support VLAs at all** — your code will break.
> - ⚠️ You cannot use such arrays in contexts requiring compile-time constants (e.g., templates, `constexpr`, `static_assert`).
> ✅ **Correct approaches**:
> - **If size is known at compile time**:
>     `constexpr int size = 10; int arr[size]; // ✅ OK`
> - **If size is only known at runtime**:
>     `int size; std::cin >> size; std::vector<int> arr(size); // ✅ Portable, standard, dynamic`
> 💡 **Rule of thumb**: If you're using a runtime value to define an array size, use `std::vector`. Save raw arrays for small, fixed-size cases where `constexpr` works.





