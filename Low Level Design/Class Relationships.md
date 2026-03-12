## Association ("has-a") 

In this type of relationship, two objects use or know about each other. They can exist independently of each other.

Example: A student has a teacher, both can exist independently of each other.

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

The above example is for unidirectional association, there also can be bidirectional association (both classes are aware of each other).

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

There is 1-1, 1-many, many-1, many-many associations possible.

| **Relationship** | **Entity A** | **Entity B**      | **Implementation Tip**                 |
| ---------------- | ------------ | ----------------- | -------------------------------------- |
| **1:1**          | Person       | Social Security # | Unique pointer or shared ID            |
| **1:N**          | Library      | Books             | List/Vector in the "One" side          |
| **N:1**          | Citizens     | City              | Foreign key/Pointer in the "Many" side |
| **N:N**          | Actors       | Movies            | Separate mapping table/class           |

## Aggregation

This is **subset** of [[#Association ("has-a")|Association]] , which implies a stronger **whole-part** relationship. The parts can exist without the whole and the parts can be shuffled/shared.

For example: A team contains football players, players can exist independently as well. Or professors in department.

This is tight coupling and the two entities are connected through a container-contained hierarchy.

## Composition

This is the strongest form of **has-a** relationship.  Where toe whole owns the parts and controls their lifecycles. The part cannot exist without the whole.

Example: Roads and speed breakers, House and Rooms, Car and its components.

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

This can be done via the following ways:
1. Accept/Return another class in/from a method
2. Instantiate a class in a method.
3. Depend on an interface instead of concrete types.

Example: A chef and a knife, chef's cut method can cut things with the knife but then he doesn't need to keep the knife with him forever.

```cpp
```