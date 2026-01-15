`int` is the alias to `System.Int32` which represents a 32 bit signed integer, `int` is a **value** type and hence it is created and stored on the stack. Integers are mutable. Following are the important things about `int` datatype in `.NET`-
- There are other classes for different integers-
```csharp
int x = 5; // System.Int32
short x = 6; // System.Int16
long x = 8; // System.Int64
uint x = 5; // System.UInt32
// and so on....
```
- By default arithmetic operations are done on an unchecked context, so overflows are ignored. See [[Checked & Unchecked Contexts]] 

## Type Casting

The following methods can be used for explicit casting to `int`
```csharp
int x = Convert.ToInt32("45"); // Throws System.FormatException if conversion fails
int y = Int32.TryParse("45"); // Assigns default value = 0 if conversion fails
```

Also Read: [[Value & Reference Types in .NET]]