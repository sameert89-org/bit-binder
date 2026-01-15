Static methods that can be used to add new behaviors to existing classes or interfaces without changing the original source. [[LINQ]] uses extension methods.

Below is a simple example of defining extension method for strings:

```csharp
namespace ExtensionMethods
{
    public static class MyExtensions
    {
        public static int WordCount(this string str)
        {
            return str.Split(new char[] { ' ', '.', '?' },
                             StringSplitOptions.RemoveEmptyEntries).Length;
        }
    }
}
```

Now this method can be called using the `.` operator on any string just by `using ExtensionMethods`.