## Association ("has-a")

In this type of relationship, two objects use or know about each other. They can exist independently of each other.

For example, a student has a teacher, and both can exist independently.

```cpp
class PaymentGateway {
public:
	void processPayment(double value){
		std::cout<< std::format("Processing payment for value: {}", value);
	}
};

// Order has-a payment gateway
class Order {
private:
	std::string orderId_;
public:
	PaymentGateway* gateway;
	Order(PaymentGateway* gateway) :
		gateway(gateway) {};

	void checkout(double value){
		this->gateway->processPayment(value);
	}
};
```

The example above shows a unidirectional association. Associations can also be bidirectional, where both classes are aware of each other.

```cpp
class Developer {
private:
    Team* team;
public:
    void setTeam(Team* team) {
        this->team = team;
    }
};

class Team {
private:
    vector<Developer*> developers;
public:
    void addDeveloper(Developer* dev) {
        developers.push_back(dev);
        dev->setTeam(this);
    }
};
```

Associations can be one-to-one, one-to-many, many-to-one, or many-to-many.

| **Relationship** | **Entity A** | **Entity B**      | **Implementation Tip**                 |
| ---------------- | ------------ | ----------------- | -------------------------------------- |
| **1:1**          | Person       | Social Security # | Unique pointer or shared ID            |
| **1:N**          | Library      | Books             | List/Vector in the "One" side          |
| **N:1**          | Citizens     | City              | Foreign key/Pointer in the "Many" side |
| **N:N**          | Actors       | Movies            | Separate mapping table/class           |

## Aggregation

Aggregation is a subset of [[#Association ("has-a")|association]] that implies a stronger **whole-part relationship**. The parts can exist without the whole and can be shuffled or shared.

For example, a team contains football players who can also exist independently. Another example is professors in a department.

This is tight coupling and the two entities are connected through a container-contained hierarchy.

## Composition

Composition is the strongest form of a **has-a relationship**. The whole owns its parts and controls their lifecycles. A part cannot exist without the whole.

Examples include roads and speed breakers, a house and its rooms, or a car and its components.

```cpp
class SpeedBreaker {
public:
    SpeedBreaker() {
        std::cout << " [Part] Speed breaker created.\n";
    }
    ~SpeedBreaker() {
        std::cout << " [Part] Speed breaker destroyed.\n";
    }
};

class Road {
private:
    std::vector<SpeedBreaker> breakers;

public:
    Road(int count) {
        std::cout << "[Whole] Building Road...\n";
        breakers.resize(count);
    }
};
```

## Dependency

A dependency exists when one class relies on another to do something, but does so without retaining a permanent reference to it.

This can be done in the following ways:

1. Accept or return another class in a method.
2. Instantiate a class in a method.
3. Depend on an interface instead of concrete types.

For example, a chef's `cut` method can use a knife without the chef keeping the knife forever.

```cpp
// Accept/Return another class in/from a method
class EventPublisher {};
class EventPublisherFactory {
public:
	EventPublisher createEventPublisher(const std::string &topic_name) {
		return EventPublisher();
	};
};

class Canvas {
public:
    void drawSprite(std::string name, int x, int y) {
        std::cout << "Drawing " << name << " at (" << x << "," << y << ")\n";
    }
};

class Player {
private:
    std::string name = "Hero";
    int x = 10, y = 20;

public:
    void render(Canvas& currentScreen) { // Does not make sense to store hard reference to canvas since it might be recreated in the next scene
        currentScreen.drawSprite(name, x, y);
    }
};

// Instantiate class in a method
class JsonFormatter {
public:
	std::string format(const std::string &message){
		return "{\"message\":\"" + message + "\"}";
	}
};
void printAsJson(const std::string &message){
	JsonFormatter formatter;
	std::cout << formatter.format(message);
}
```

### Dependency Injection

When dependencies are provided from outside, it is known as dependency injection.

You can let objects create their own dependencies, but that introduces *tight coupling* and reduces reusability.

This is usually done through a constructor.

```cpp
class StorageService {
private:
	BlobContainerClient* blobContainerClient;
public:
	StorageService(BlobContainerClient &containerClient) :
		blobContainerClient(containerClient) {}
}
```
