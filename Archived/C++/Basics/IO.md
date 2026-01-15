## Basics

**Streams:** IO in C++ is provided by *streams*. A stream is an abstraction that represents a sequence of bytes. It hides the underlying details of a physical device. Streams have 2 broad categories **Input & Output**. 

Here's a table of common C++ I/O streams, indicating their availability in C:

| C++ I/O Stream       | Description                                     | Available in C                                |
| -------------------- | ----------------------------------------------- | --------------------------------------------- |
| `std::cin`           | Standard input stream (keyboard)                | Yes (via `stdin`)                             |
| `std::cout`          | Standard output stream (console)                | Yes (via `stdout`)                            |
| `std::cerr`          | Standard error stream (console, unbuffered)     | Yes (via `stderr`)                            |
| `std::clog`          | Standard log stream (console, buffered)         | No                                            |
| `std::ifstream`      | Input file stream                               | Yes (via `FILE*` and `fopen`, `fread`, etc.)  |
| `std::ofstream`      | Output file stream                              | Yes (via `FILE*` and `fopen`, `fwrite`, etc.) |
| `std::fstream`       | Input/output file stream                        | Yes (via `FILE*` and `fopen`, `fseek`, etc.)  |
| `std::stringstream`  | String stream for in-memory string manipulation | No                                            |
| `std::istringstream` | Input string stream                             | No                                            |
| `std::ostringstream` | Output string stream                            | No                                            |

## Operators for IO
```cpp
>> // insertion operator
<< // extraction operator
```
## Special Cases
*In `cin` spaces are ignored* `endl` flushes the buffers while `/n` doesn't.
*When you have 2 or more inputs. as soon as you write space, it assumes the end of integer and moves to the next input.*
```cpp
int a; float b;
cin >> a >> b;
// input is 25.63
// a = 25, b = 0.63
```

## C style IO

In C, the I/O is provided by the `stdio` library.
#### 1. Input: Reading Data

- **`scanf()`:**
    
    - **Purpose:** The most common function for formatted input.
        
    - **Syntax:** `int scanf(const char *format, ...);`
        
    - **Common Format Specifiers:**
        
        - `%d`: Integer
            
        - `%lld`: Long long integer
            
        - `%f`: Float
            
        - `%lf`: Double (for `scanf`, `%f` and `%lf` behave differently than `printf`)
            
        - `%c`: Character
            
        - `%s`: String (reads until whitespace, automatically appends null terminator)
            
        - `%[chars]`: Scans a set of characters. E.g., `%[^\n]` reads until a newline.
            
    - **Return Value:** Number of items successfully read. Returns `EOF` on end-of-file or error.
        
    - **Example:**
        ```c
        int a, b;
        scanf("%d %d", &a, &b);
        
        char str[100];
        scanf("%s", str); // Reads a word
        ```
- **`getchar()`:**
    
    - **Purpose:** Reads a single character from `stdin`.
        
    - **Syntax:** `int getchar(void);`
        
    - **Return Value:** The character read, or `EOF` on end-of-file/error.
        
    - **Example:**
        ```c
        char ch = getchar();
        while (ch != '\n' && ch != EOF) {
            // Process character
            ch = getchar();
        }
        ```

- **`gets()`:**
    
    - **Purpose:** Reads a line from `stdin` into a string, until it encounters a newline
        
    - **Syntax:** `gets(variable_name)`
        
    - **Arguments:**
        
        - `str`: Pointer to the character array to store the string.
            
        - `n`: Maximum number of characters to read (including null terminator).
            
        - `stream`: The input stream (usually `stdin`).
            
    - **Return Value:** `str` on success, `NULL` on error or EOF.
        
    - **Example:**
    ```c
        char string[10];
	    printf("Enter the string: ");
	    scanf("%s", string);
    ```

#### 2. Output: Printing Data

- **`printf()`:**
    
    - **Purpose:** The most common function for formatted output.
        
    - **Syntax:** `int printf(const char *format, ...);`
        
    - **Common Format Specifiers:**
        
        - `%d`: Integer
            
        - `%lld`: Long long integer
            
        - `%f`: Float
            
        - `%lf`: Double (for `printf`, `%f` and `%lf` are the same for `double` arguments, but for `float` arguments, you still use `%f`)
            
        - `%c`: Character
            
        - `%s`: String
            
    - **Return Value:** Number of characters printed, or a negative value on error.
        
    - **Example:**
        ```c
        int x = 10;
        double pi = 3.14159;
        printf("Value of x: %d, Pi: %.2lf\n", x, pi); // %.2lf for 2 decimal places
        ```
- **`putchar()`:**
    
    - **Purpose:** Writes a single character to `stdout`.
        
    - **Syntax:** `int putchar(int char);`
        
    - **Return Value:** The character written, or `EOF` on error.
        
    - **Use in CP:** Useful for printing character by character, often as part of a faster custom output function.
        
    - **Example:**
        ```c
        char greeting[] = "Hello";
        for (int i = 0; greeting[i] != '\0'; i++) {
            putchar(greeting[i]);
        }
        putchar('\n');
        ```


Read More: [[Logging]]