>  The Composite Design Pattern is a structural pattern used to treat individual objects and groups of objects (compositions) uniformly.

### Why do I need a Composite?
The most common example would be *files* and *folders*.  A folder is a composite of files. Both files and folders can share certain methods. The units which a **Composite** is made of are called **Leaves**. This pattern makes a lot of sense when there is a clear hierarchy between classes and they benefit from a shared interface.

![[Composite 2026-04-06 00.57.52.excalidraw]]

There are 2 types of composites:
1. *Transparent composite*: Both Leaf and Composite expose management methods
2. *Safe composite*: Leaves do not expose management methods (only composites can add/remove children).

*Note: These are only applicable for management methods like add or remove child from composite, the shared interface is still applicable*

### Example: Files and Folders
Here is a cliche but good example of this.

```csharp
public interface IFsItem {
	public void
}
```