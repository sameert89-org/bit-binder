> If there are multiple ways of doing a thing and you need to decide *dynamically* at runtime on which one to pick, then strategy is the right pattern.

## Overused Example: Payment Processor
There are multiple ways to collect payments nowadays, user can pick a debit card, a credit card, UPI (India exclusive), netbanking, giftcards, paypal etc. etc.

The more payment options you support the more users you can reach. Below is a cliche example of payment processor.

```csharp
public interface IPaymentStrategy
```


