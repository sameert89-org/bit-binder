> The Iterator design pattern provides a standard way to access elements of a collection sequentially without exposing the collection’s internal structure.

```csharp
public class NameCollection {
    private List<string> names = ["Alice", "Bob", "Charlie"];
}
```

If someone wants to iterate on names, then it needs to know about the internal names field of the collection.

An iterator interface looks like this:

```csharp
public interface Iterator<T> {
    boolean hasNext();
    T next();
}
```

Now you can call next if next exists and get the desired item. `foreach` loop in C# and range-based for loop in C++ and almost all other languages have some built in syntax to take advantage of the Iterator pattern.


## Example: `foreach`
In most languages `foreach` looks like this
```pseudocode
foreach item in collection:
	print item
```
Behind the scenes this almost always relies on the iterator pattern.

In C# we have `IEnumerable` interface which is heavily utilised in LINQ operations.

Basically any type of traversals be it, directory traversals, reading files line by line and anything else can be modeled using this pattern.