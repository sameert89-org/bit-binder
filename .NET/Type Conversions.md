**Created:** 2024-03-05 11:50
**Last Modified:** Tuesday 5th March 2024 11:50:14
**Author:** Sameer89

## Implicit Type Conversions

Also known as **coercion**, compiler does the conversion for you. Following code shows some examples that are out of your common intellect-
```csharp
int x = false; // Not allowed throws compiler error
char alpha = 'a';
Console.WriteLine((int)alpha); // Prints 65
```

```csharp
void MyMethod() {
    Console.WriteLine("Hello, World!");
}

Action myAction = MyMethod; // Implicit conversion from method group to Action delegate
Console.WriteLine(myAction); // Outputs: System.Action
```

### User Defined Conversion Operators

Types can have custom implicit conversion logic to convert objects from one to another type. 

```csharp
public class Meter
{
    public double Value { get; set; }

    public Meter(double value)
    {
        Value = value;
    }

    // Implicit conversion from Meter to Kilometer.
    public static implicit operator Kilometer(Meter m)
    {
        return new Kilometer(m.Value / 1000.0);
    }
}

public class Kilometer
{
    public double Value { get; set; }

    public Kilometer(double value)
    {
        Value = value;
    }

    // Implicit conversion from Kilometer to Meter.
    public static implicit operator Meter(Kilometer km)
    {
        return new Meter(km.Value * 1000.0);
    }
}

```

## Explicit Type Conversion

This can be done using explicit cast operator `()` This doesn't always work.

```csharp
double d = 123.45;
int i = (int)d;
```
## Type Conversions using Strings

### Parsing From Strings
**Parsing** Refers tot he process of conversion of a value's *string* representation to the value type.

Most of the value types come with a static `Parse` and `TryParse` methods.
```csharp
int x = int.Parse('2'); // Throws exception if conversion fails
bool possible = int.TryParse("sameer", out int result); // Does not throw exception on failing, instead returns a default value
```

> [!danger] Implicit vs Explicit Confusion
> Note that `int x = '2'` is not the same as `int x = int.Parse('2')` the first one results in **50** which is the ASCII code of literal 2. 

### Parsing to Strings

Since everything in `.NET` is derived from `System.Object` class they all share the property `.ToString()` so nearly everything in `.NET` can be *stringified*. 

Also Read: [[Operator Overloading]], [[Expressions & Expression Trees]], [[Out & Ref]]