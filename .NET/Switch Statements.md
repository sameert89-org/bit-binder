**Created:** 2024-03-05 22:16
**Author:** Sameer89

Works just like you would expect, **fallthrough** is also supported, however there is a difference from c++, expressions are supported, you can have something like `case >=5 && < 7:` this works just fine. Pattern matching and switch expressions were introduced in `.NET v8` there is an *or* keyword.

```csharp
using System;

class Program
{
    static void Main()
    {
        int day = 4;
        switch (day)
        {
            case 1:
                Console.WriteLine("Monday");
                break;
            case 2:
                Console.WriteLine("Tuesday");
                break;
            case 3:
                Console.WriteLine("Wednesday");
                break;
            case 4:
                Console.WriteLine("Thursday");
                break;
            case 5:
                Console.WriteLine("Friday");
                break;
            case 6:
                Console.WriteLine("Saturday");
                break;
            case 7 or 0: // <- Notice the difference
                Console.WriteLine("Sunday");
                break;
            default:
                Console.WriteLine("Invalid day");
                break;
        }
    }
}

```

## Switch Expressions & Pattern Matching

A switch expression is a more succinct way to express a switch statement that returns a value. It evaluates an expression and matches its result to a pattern, then executes a corresponding expression. The basic syntax is as follows:

```csharp
var result = expression switch
{
    pattern1 => expression1,
    pattern2 => expression2,
    ...
    _ => defaultExpression // The discard pattern (_) is used for the default case
};

```
The flow is like this-
1. Evaluate the *expression* and get its value .
2. Match this value to a pattern.
3. Evaluate the appropriate expression from the switch list.
4. Evaluate the defaultExpression if nothing matches.

### Patterns (Expressions & Pattern Matching)

Tools for checking values in a more concise and readable way.

### Types of Patterns

#### 1. **Constant Patterns**

These match a variable against a constant value. For example, matching a number against specific cases:

```csharp
var number = 3;
var result = number switch
{
    1 => "One",
    2 => "Two",
    _ => "Other"
};

```

Here, `1` and `2` are constant patterns.

#### 2. **Type Patterns**

These patterns match the object against a type. It's useful for performing operations based on the type of an object:

```csharp
object obj = "hello";
var result = obj switch
{
    int i => $"Integer: {i}",
    string s => $"String: {s}",
    _ => "Unknown type"
};

```

In this case, `int i` and `string s` are type patterns that not only match the type but also declare a variable of that type which you can use within the expression.

#### 3. **Var Patterns**

These are somewhat of a catch-all pattern that can match any type, often used with when conditions to apply further constraints:

```csharp
var result = obj switch
{
    var i when i > 0 => "Positive",
    var i when i < 0 => "Negative",
    _ => "Zero or not a number"
};

```

#### 4. **Relational Patterns**

Introduced in C# 9, these allow for comparisons within patterns, such as less than, greater than, etc.:

```csharp
var temperature = 25;
var comfortLevel = temperature switch
{
    < 0 => "Freezing",
    < 20 => "Cold",
    < 30 => "Comfortable",
    _ => "Hot"
};

```

#### 5. **Logical Patterns (`and`, `or`, `not`)**

These enable combining patterns using logical operators to form more complex conditions:

```csharp
var number = 10;
var rangeCheck = number switch
{
    > 0 and < 10 => "Between 1 and 9",
    10 or 20 => "Either 10 or 20",
    not 0 => "Not zero",
    _ => "Either zero or outside the range of 1-9 and not 10 or 20"
};

```

Also Read: [[]]