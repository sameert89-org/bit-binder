**Compiler:** Translates high level language to low level.
**Linker:** Creates Executables (Links Code to Libraries)

## Common Compiler Terms

`clean:` this option cleans all earlier compiled versions of project files as well as the executables.
`rebuild:` clean + build
`config:` generally either *debug* or *release*, debug contains objs and other extra stuff required for debugger to go through code, release is cleaner binary just containing the main application.


## Compiler Errors

- **Syntax Errors:** Something wrong with the code structures. Example: `innt b = 5;` 
- **Semantic Errors:** Meaning/Logical errors, Example: `char a; int b; char c = a + b`'.
- **Linker Errors:** Missing Libraries, compilation can still succeed in this case.
- **Runtime Errors:** Error occurred during runtime, harder to debug, Example: seg fault.
- **Logical Errors:** Causes the program to run incorrectly.