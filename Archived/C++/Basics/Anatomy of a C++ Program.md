
```cpp
#include<iostream>

using namespaces std;

int main(){
	string message = "hello world"
	std::cout << message;
	return 0;
}
```
**Keywords:** Reserved words in the language for special purpose. Example: `int`, `using`. 

**Identifier:** Made by programmers for something meaningful. Example: `message`

**Operators:** operators are special symbols or keywords that perform operations on one or more operands. Example: `<<`,  `=`

**Preprocessor:** A program which processes your code before the compiler, one of its jobs is to strip all the comments to a single space and collect libraries. 

**Comments:** `//` single line, `/**/` multiline.

`main` function: There can be only 1 main function, it serves as the entry point of a program. Return code 0 means successful execution.


> [!INFO] Arguments
> You can pass some data from outside environment to a program while executing it, one of the ways of doing this is using command line arguments. In C++ the main function can accept additional parameters, `int main(int argc, char* argv[])`, `argc` is the *argument count* and `argv` is the *argument values*. For example ./program arg1 arg2, will call the main function as `main(2, [arg1, arg2])`

**Namespaces:** When we use more and more libraries from different places, it often creates naming conflicts, namespaces often help resolve that. Example: `std::cout` means use `cout` from the standard namespace,  if any other linked library has the same method, it allows the compiler to distinguish between those.


