g++ is the **GNU C++ Compiler**

Below is the rough process of the build

![[G++ 2026-04-24 18.51.37.excalidraw]]


> [!INFO] Compiling vs Linking
> *Compiling* translates source code into machine code, linking glues together multiple files and libraries into an executable.

### Basic compilation

```bash
g++ main.cpp
```

This creates an executable named `a.out` or `a.exe` depending on the environment.

### Compile with output name

```bash
g++ main.cpp -o app
```

This creates an executable named `app` or `app.exe`

### Compile Multiple `.cpp` files

Suppose structure is:

```txt
project/
  main.cpp
  user.cpp
  user.hpp
```

```bash
g++ main.cpp user.cpp -o app
```

### Specifying C++ version

This can be done using `-std` flag

```cpp
g++ main.cpp -std=c++20 -o app
```

### Warnings

```bash
g++ main.cpp -std=c++17 -Wall -Wextra -Werror -o app
```

This enables warnings, extra warnings and treats warnings as errors.

### Debug Build
Useful when debugging with *gdb*

```bash
g++ main.cpp -std=c++17 -g -O0 -o app
```

- `-g` adds debug symbols
- `-O0` disables optimizations

| Optimization Flag | Meaning         |
| ----------------- | --------------- |
| `-O0`             | no optimization |
| `-O1`             | basic           |
| `-O2`             | good general    |
| `-O3`             | aggressive      |
| `-Os`             | for size        |
### Threading

When using threading/pthread

```bash
g++ main.cpp -std=c++17 -pthread -o app
```

### Compile Only Do Not Link

```bash
g++ -c user.cpp
```

### Header include paths
If headers are in an `include` folder

```cpp
project/
  src/main.cpp
  include/user.hpp
```

Compile like below:
```bash
g++ src/main.cpp -Iinclude -o app
```

`-IfolderPath/folderName` adds the `folder` to the header search path