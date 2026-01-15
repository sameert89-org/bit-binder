List is a generic reference type, unlike [[ArrayList]] these follow C# generics and store a single type, therefore are much more performant compared to their other counterpart due to reduced number of boxing-unboxing operations.

## Creating A List

```csharp
List<int> myList = new List<int>();

List<int> myList = new();

// Create and Initialize
List<int> myList = new () {1 ,2, 3};
```

## Adding Elements

Lists are dynamically sized.

```csharp
// Adding single element
myList.Add(1);

// Adding multiple items
myList.AddRange(enumerableCollection);
```

## Properties and Methods

There are a shit tonne, don't need to know all of them, we'll cross the bridge when we come to it, here are the important ones-

- **Count**: Returns the number of elements in the list.
- **Remove(item)**: Removes the first occurrence of the item.
- **Contains(item)**
- **Find, FindIndex, FindLast, FindLastIndex**: Returns the first occurrence of item itself or index or the last occurrence and last occurrence index. If the element is not found `Find` and `FindLast` return the default value `T`. `FindIndex` and `FindLastIndex` return `-1`.
- **RemoveAt(idx)**
- **Clear()**
- **Sort()**
- **Reverse()**
- **ToList()**
