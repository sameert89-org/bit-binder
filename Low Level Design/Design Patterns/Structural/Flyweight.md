> Flyweight helps **reduce memory usage** when you have a large number of similar objects.

Instead of storing repeated data, separate it into two types:

| Type                | Meaning                      | Stored Where                    |
| ------------------- | ---------------------------- | ------------------------------- |
| **Intrinsic state** | Shared, reusable data        | Inside flyweight object         |
| **Extrinsic state** | Unique/context-specific data | Passed from outside when needed |

```cpp
// without flyweight
Tree object:
- type = "Oak"
- texture = oak_texture.png
- color = green
- x = 10
- y = 20

Tree object:
- type = "Oak"
- texture = oak_texture.png
- color = green
- x = 50
- y = 80

// with flyweight
TreeType shared object: // this is the flyweight object which is shared
- type = "Oak"
- texture = oak_texture.png
- color = green

Tree object:
- x = 10
- y = 20
- treeType = shared Oak TreeType

Tree object:
- x = 50
- y = 80
- treeType = same shared Oak TreeType
```


> [!DANGER] Flyweight and thread safety
> Flyweight objects should be treated as **immutable/read-only** so they become inherently **thread-safe**.

This design pattern is prevalent in game development, where you need many similar objects such as players, mobs, and environmental objects.

```csharp
public sealed class TreeType
{
    public string Type { get; } // same as public readonly string Type;
    public string Texture { get; }
    public string Color { get; }

    public TreeType(string type, string texture, string color)
    {
        Type = type;
        Texture = texture;
        Color = color;
    }
}

public class Tree {
	public int X;
	public int Y;
	public TreeType type;
}
```

Another common example of Flyweight is a **text editor**. Instead of storing font glyphs and rendering information in each character, each character stores only its position and a reference to shared style information.

```cpp
class CharacterStyle {
public:
	string font;
	ushort size;
	string color;
	bool bold;
	bool italic;
}

class Character {
public:
	int x;
	int y;
	std::shared_ptr<CharacterStyle> style;
}
```


> [!INFO] Factories and intrinsic properties
> The contents of the flyweight are called *intrinsic* properties, while the object's unique properties are *extrinsic*. Flyweight is generally used with a factory that caches each unique flyweight and returns the same reference.

Related: [[Factory]]
