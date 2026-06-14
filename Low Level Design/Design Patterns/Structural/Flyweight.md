>A *structural* design pattern which helps **reduce memory** when having a large number of similar objects.

Instead of storing repeated data you:

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

This design pattern is very prevalent in game development where you need a lot of similar objects (players, mobs, environment etc.)

