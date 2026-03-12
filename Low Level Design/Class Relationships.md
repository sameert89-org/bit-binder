## Association ("has-a") In this type of relationship between classes, one object uses, communicates with or references another.

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

