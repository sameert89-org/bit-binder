> A class is a *blueprint/template/recipe* for creating objects.

It groups related data (fields) & behaviors (functions) together.

```cpp
struct Color {
	uint8_t R;
	uint8_t G;
	uint8_t B;
};
class Car {
private:
	string model_;
	string year_;
	Color color_;

public:
	Car(string &model, string &year, Color &color) : 
		model_(model), year_(year), color_(color) { }
};
```


