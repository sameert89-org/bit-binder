> Composite treats individual objects and groups of objects uniformly.

## Why do I need a composite?

The most common example is files and folders. A folder is a composite of files, and both files and folders can share certain methods. The units that a composite contains are called **leaves**. This pattern makes sense when classes form a clear hierarchy and benefit from a shared interface.

![[Composite 2026-04-06 00.57.52.excalidraw]]

There are two types of composites:

1. **Transparent composite:** Both leaves and composites expose management methods.
2. **Safe composite:** Leaves do not expose management methods; only composites can add or remove children.

> [!NOTE] Management methods
> This distinction applies only to management methods such as adding or removing children. The shared interface still applies.

## Example: Files and folders

Here is a cliché but useful example:

```csharp
public interface IFsItem {
	public string Name { get; }
	public void Rename(string newName);
	public void Delete();
	public IFsItem Clone();
}

// Leaf
public sealed class File(string name) : IFsItem {
	public string Name { get; private set;} = name;
	public void Rename(string newName)
	{
		if(string.IsNullOrWhiteSpace(newName))
			throw new ArgumentException("Invalid name provided");
		Name = newName;
	}

	public void Delete()
	{
		// delete from file system
	}

	public IFsItem Clone()
	{
		return new File(Name);
	}

}

public sealed class Folder(string name) : IFsItem {
	private readonly Dictionary<string, IFsItem> _children = [];
	public string Name {get; private set; } = name;

	public void AddItem (IFsItem fsItem)
	{
		_children.Add(fsItem.Name, fsItem);
	}

	public void RemoveItem(string name)
	{
		if(_children.TryGetValue(name, out var fsItem))
		{
			_children.Remove(name);
			fsItem.Delete();
		}
	}


    public IFsItem Clone()
    {
        throw new NotImplementedException();
    }

    public void Delete()
    {
        throw new NotImplementedException();
    }

    public void Rename(string newName)
    {
		if(string.IsNullOrWhiteSpace(newName))
			throw new ArgumentException("Invalid name provided");
		Name = newName;
    }
}
```

## Example: JavaScript DOM tree
