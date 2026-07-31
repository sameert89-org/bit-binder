> At its core, an interface is a **contract** that must be fulfilled by an implementing class.

Interfaces enable [[Types of Polymorphism]].

```cpp
class PaymentGateway {
public:
	virtual ~PaymentGateway() {}
	virtual void initiatePayment(double amount) = 0;
};

class PaypalPayment : public PaymentGateway {
	void initiatePayment(double amount) override {
		std::cout << "Processing payment through PayPal";
	}
};

class RazorpayPayment : public PaymentGateway {
	void initiatePayment(double amount) override {
		std::cout << "Processing payment through Razorpay";
	}
};
```
