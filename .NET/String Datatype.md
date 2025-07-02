`string` is an alias to the type `System.String` which is a **reference** type in `.NET` 
It Stores a string in the form of character array. Here are some important things about strings-
- strings in .NET like in Java are immutable.
- Each character is stored as UTF-16 Unicode characters, unlike `c++` which has notions of `std::wstring` for UTF-16 and/or UTF-32 strings
- Memory is allocated on the managed heap for strings.
- `String.Empty` is now equivalent to `""` it is used to assign empty strings, in older `.NET` versions, `""` used to have some small memory allocation. 


> [!info] String Interning
> `.NET` has the interning mechanism, only one copy of a unique literal string is stored in the memory, if there are multiple variables storing the same literal string they are referenced to the same block.


> [!tip] Secure Strings
> `.NET` offers the `SecureString` class which ensured that the string data is stored as encrypted values in the memory.

**Do Read: [[Value & Reference Types in .NET]]**
## Interpolated Strings

From `.NET 6` onwards, interpolated strings were introduced-

```csharp
int age = 50;
string description = $"The man was a tall African-American possibly in his {age}s";
```

Following things must be kept in mind:
- To use curly braces inside interpolated strings you can use `{{ or }}`.
- interpolated [raw string literals](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/reference-types#string-literals) are supported, the number of `$` signs determine the number of braces that I have to use for inserting expressions inside these strings (C# 11)
- Interpolable expressions are supported (C# 11)

Also Read: [[Verbatim Identifier]], [[StringBuilder]], [[Value & Reference Types in .NET]], [[Type Conversions]]
