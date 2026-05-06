> Split an abstraction and its implementation so both can evolve independently.

## Why do I need a bridge?
It is usual to get into inheritance hell, take a look at the following class

```cpp
class Remote {
public:
	virtual void SetVolume();
	virtual void C
};
```