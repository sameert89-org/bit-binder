**Created:** 2024-03-04 22:01
**Last Modified:** Monday 4th March 2024 22:01:15
**Author:** Sameer89

`DateTime` is a useful datatype for storing date and time. The `System.DateTime` class has a bunch of useful properties and methods for working with date and time. It is a *value* type. Below code-block illustrates some of the important properties-

```csharp
DateTime today = DateTime.Now();
// Formatting date time. DateTime has ToString overload that takes formats
today.ToString("d"); // Only the Date
// Parsing to DateTime
DateTime myDate = DateTime.Parse("28-05-2002"); // Follows the locale of the machine to attempt to parse the string, you can provide a provider as the second argument
DateTime myOtherDate = DateTime.ParseExact("28/05/2002", "d/M/yyyy", CultureInfo.InvariantCulture); // There is a whole table of such abbreviations d->date, M->Month etc.
// CultureInfo.InvariantCulture specifies to ignore your current locale's interpretation, for example Friday may be called something different in French, so Compiler might get confused.
DateTime.UtcNow; // Provides UTC time
```
[DateTime Format Strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)

Also Read: [[DateOnly Datatype]], [[TimeOnly DataType]]