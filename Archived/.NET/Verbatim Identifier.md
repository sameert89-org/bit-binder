`@` symbol is the verbatim identifier it has several functions-
- Indicate that a string is literal, escape sequences are not required in literals
```csharp
string filePath = @"C:\users\samee\Documents";
```
- Using C# key words as identifiers-
```csharp
string @for = "This is a the value of for";
```
- Help compiler distinguish between naming conflicts of attributes- if you define an attribute in C# convention is to suffix it with the word *Attribute* this word is omitted by the compiler and the prefix is treated as the attribute name. Now if you do something like below, then there is a problem-
```csharp
using System;

[AttributeUsage(AttributeTargets.Class)]
public class Info : Attribute
{
   private string information;

   public Info(string info)
   {
      information = info;
   }
}

[AttributeUsage(AttributeTargets.Method)]
public class InfoAttribute : Attribute
{
   private string information;

   public InfoAttribute(string info)
   {
      information = info;
   }
}

[Info("A simple executable.")] // Generates compiler error CS1614. Ambiguous Info and InfoAttribute.
// Prepend '@' to select 'Info' ([@Info("A simple executable.")]). Specify the full name 'InfoAttribute' to select it.
public class Example
{
   [InfoAttribute("The entry point.")]
   public static void Main()
   {
   }
}
```