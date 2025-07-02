**Created:** 2024-03-07 11:20
**Author:** Sameer89

Dictionaries store key value pairs. Internally it is hash based, almost everything in `.NET` has `GetHashCode()` method. It uses open addressing with probing to resolve collisions.
If it can't find a key it throws `KeyNotFoundException`.

> [!info] Order of Elements
> Before `.NET 3.0` the dictionary implementation did not preserve the order of insertion. But since `.NET 3.0` the dictionaries do preserve the order.


```csharp
// Declare and Initialize
Dictionary<int, string> hmp = new () {
	{1, "sameer"},
	{2, "remaas"}
}

// Adding Values
hmp.Add(3, "something");

hmp[4] = "nothing";

// Removing Values

hmp.Remove(3);

hmp.Clear();

// Getting Keys values etc

hmp.ContainsValue("sameer");

hmp.ContainsKey(4);

if(hmp.TryGetValue(4, out string value))
{
    // value is scoped to this block, this is a syntactic sugar
}

var vals = hmp.Values; // Type ValueCollection

var keys = hmp.Keys; // Type KeyCollection


```

Also Read: [[]]