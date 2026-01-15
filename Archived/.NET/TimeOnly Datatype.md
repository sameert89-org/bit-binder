**Created:** 2024-03-05 11:19
**Last Modified:** Tuesday 5th March 2024 11:19:54
**Author:** Sameer89

Just like `DateOnly`, `TimeOnly` was introduced to reduce the confusion and extra overhead where only time is required. For example-
```csharp
TimeOnly openingTime = TimeOnly.Parse("12PM");
```


> [!error] Now Property
> It is exclusive to `System.DateTime` class, so `DateOnly` and `TimeOnly` do not have it.

Also Read: [[DateTime Datatype]]