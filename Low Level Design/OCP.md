Open Closed Principle

> "**A class should be open for extension but closed for modification.**"

A system will always need new features, but existing features should not have to be changed for adding new features.

Interfaces and abstractions are your friend :) but you need to not over do it.

### E
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