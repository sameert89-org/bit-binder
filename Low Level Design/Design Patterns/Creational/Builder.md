> Builder is an assembly line, which lets you construct complex objects step by step!

### Why do I need a builder?
If you ever run into Constructors/Factories with a large number of parameters, then you need a builder!

### How do I Implement a Builder?
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

> [!NOTE] Builder doesn't just add
> The only restriction about builder is that its supposed to be used during object creation, but one important  distinction is that its absolutely fine to have a `removeTopping` in your Pizza class, a Pizza is considered built when the order is confirmed!

```csharp
class AiAgentBuilder{
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

class AiAgentBuilder(string name){
	private string _model = "gpt-5-turbo";
	private double _temperature = 0.5;
	private int _maxTokens = 2048;
	private string _region = "us-central-1";
	private readonly List<string> _tools = [];


	public AiAgentBuilder SetCreativity(double temperature) {
 		_temperature = temperature;
		return this;
	}

	public AiAgentBuilder WithModel(string model) {
		_model = model;
		return this;
	}
	
	public AiAgentBuilder SetMaxTokens(int tokens) {
		_maxTokens = tokens;
		return this;
	}

	public AiAgentBuilder InRegion(string region) {
		_region = region;
		return this;
	}
	
	public AiAgentBuilder AddTool(string tool) {
		_tools.Add(tool);
		return this;
	}
}
```