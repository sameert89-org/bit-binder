Open Closed Principle

> "**A class should be open for extension but closed for modification.**"

A system will always need new features, but existing features should not have to be changed for adding new features.

Interfaces and abstractions are your friend :) but you need to not over do it.

### Example of a code violating OCP
```cpp
class CheckoutService {
public:
    void processPayment(const string& paymentType) {
        PaymentProcessor processor;

        if (paymentType == "CreditCard") {
            processor.processCreditCardPayment(100.00);
        } else if (paymentType == "PayPal") {
            processor.processPayPalPayment(100.00);
        }
    }
};
```
### Corrected Code
```cpp
class CheckoutService {
public:
    void processPayment(PaymentMethod* method, double amount) {
        PaymentProcessor processor;
        processor.process(method, amount);
    }
};

// Usage
CheckoutService checkout;
CreditCardPayment credit;
PayPalPayment paypal;
UPIPayment upi;

checkout.processPayment(&credit, 100.00);
checkout.processPayment(&paypal, 100.00);
checkout.processPayment(&upi, 100.00);
```