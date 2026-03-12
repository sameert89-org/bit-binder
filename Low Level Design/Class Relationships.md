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
This is **subset** of [[#Association ("has-a")|Association]] , which implies a stronger **whole-part** relationship.

For example: A team contains football players, players can exist independently as well.

This is tight coupling and the two entities are connected through a container-contained hierarchy
