> Builder is an assembly line, which lets you construct complex objects step by step!

**Why do I need a builder?**
If you ever run into Constructors/Factories with a large number of parameters, then you need a builder!

```cpp
enum Class Crust {
	CLASSIC_TOSSED,
	NEW_PAN_TOSSED,
	THIN,
	STUFFED
};

class Pizza {
public:
	Pizza(int size, Crust crust, bool cheese, bool chicken, bool olives); // and so on
}

// builder helps with this exact problem

class Pizza {
private:
	int _size = 7;
	Crust _crust;
	bool cheese = false;
	bool chicken = false;
	bool olives = false;
public:
	Pizza(int size, Crust crust) : _size(size), _crust(crust) {};
	
	Pizza& AddCheese() {
		_cheese = true;
	};
	Pizza& AddChicken() {
		_chicken = true;
	};
	Pizza& AddOlives() {
		_olives = true;
	};
}
```

```csharp
class AiAgent{
	private string _name;
	private string _model = "gpt-5-turbo";
	private double _temperature = 0.5;
	private int _maxTokens = 2048;
	private string _region = "us-central-1";
	private readonly List<string> _tools = [];

	public AiAgent(string name, string model, double temperature, int maxTokens, string region, List<string> tools) {
		// cognitive complexity too high
	}
}


```