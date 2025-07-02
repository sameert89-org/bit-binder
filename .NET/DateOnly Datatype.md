`System.DateOnly` is available in `.NET v6` and above, it essentially separates date only from the `DateTime` class. It was introduced to enhance the clarity in scenarios where only Date was required. Using `DateTime` type in such scenarios introduces confusion.

```csharp
DateOnly birthday = DateOnly.Parse("28/05/2002");
```