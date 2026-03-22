At its core, an interface is a **contract**. 

This contract must be fulfilled by an implementing class. Interfaces enable [[Types of Polymorphism]].

```cpp
class PaymentGateway  {
public:
	virtual ~PaymentGateway() {}
	virtual void initiatePayment(double amount) = 0;
};

class PaypalPayment : public PaymentGateway {
	void initiatePayment(double amount) override {
		std::cout << "Processing payment thorugh Paypal";
	}
};

class RazorpayPayment : public PaymentGateway {
	void initiatePayment(double amount) override {
		std::cout << "Processing payment thorugh Razorpay";
	}
};
```