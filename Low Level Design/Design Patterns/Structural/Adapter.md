> Adapter is a pattern that bridges two incompatible systems.

### Why do I need an Adapter?
*Ever saw one of these?*
![[Pasted image 20260325234313.png|200]]

These are universal power plug adapters, they allow you to use different kind of sockets available around the world with your devices!

Adapter is just like that, if you got two systems that cannot understand each other, an adapter is for you!

### Example: Payment Processor
Imagine you have an app and you charge a monthly subscription for your app (I don't love you for that, but hey maybe its a good app 😁)

One day you decide to add Indian Credit Cards as a payment option, you were living in Zen mode till now with the following interface:

```csharp
interface IPaymentProcessor {
	Task ProcessPayment(double amount);
}
```

This is almost never the case, but let's assume that all the existing payment provider classes can easily implement this.

You put our your Nerd specs and fire up Claude Code to do this on a fine afternoon, but turns out RBI has dug your [grave][https://www.linkedin.com/posts/eximpe_fintech-crossborderpayments-rbi-activity-7361773667225141249-cXgd) Requiring notoriously difficult 3D Secure & 2FA Requirements. You like money (Who doesn't) so you must implement this