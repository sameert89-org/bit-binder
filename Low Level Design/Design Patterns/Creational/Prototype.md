> An object that supports cloning is called a **prototype**.

## Why do I need a prototype?

Cloning objects from outside is difficult because private fields are inaccessible, and the cloning code becomes dependent on the class's internal structure. Prototype delegates the *cloning* process to the objects themselves.

## How do I implement a prototype?

### Example: Minecraft slime

A Minecraft slime splits into two smaller halves every time it is hit.

```csharp
public class Slime(int size, int hp) {
	public Slime? Hit() {
		if(size == 1){
			hp = 0;
			return null; // can't split further
		}

		size /= 2;
		hp /= 2;

		return new Slime(size, hp);
	}
}
```

### Example: Copy a folder

```cpp
#include <memory>
#include <string>
#include <vector>

using string = std::string;

class FsItem {
public:
	virtual ~FsItem() = default;
	virtual std::unique_ptr<FsItem> Clone(bool rename = false) = 0;
};

class Folder : public FsItem {
private:
	string _path;
	std::vector<std::unique_ptr<FsItem>> _children;
public:
	Folder(string path) : _path(path) {}
	std::unique_ptr<FsItem> Clone(bool rename = false) {
		auto duplicate = std::make_unique<Folder>(_path);
		if(rename)
			duplicate->_path = _path + " (1)"; // just to demonstrate, not handling extensions
		for(auto &child: _children) {
			duplicate->_children.push_back(child->Clone());
		}

		return duplicate;
	}
};

class File : public FsItem {

};
```
