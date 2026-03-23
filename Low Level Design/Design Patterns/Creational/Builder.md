> Builder is an assembly line, which lets you construct complex objects step by step!

**Why do I need a builder?**
If you ever run into Constructors/Factories with a large number of parameters, then you need a builder!

```cpp
class Pizza {
public:
	Pizza(int size, Crust crust, bool cheese, bool chicken, bool olives);
}
```