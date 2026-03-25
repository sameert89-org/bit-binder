> Adapter is a pattern that bridges two incompatible systems.

### Why do I need an Adapter?
*Ever saw one of these?*
![[Pasted image 20260325234313.png|200]]

These are universal power plug adapters, they allow you to use different kind of sockets available around the world with your devices!

Adapter is just like that, if you got two systems that cannot understand each other, an adapter is for you!

### Example: Your card 💳 has been declined
Imagine you have an app and you charge a monthly subscription for your app (I don't love you for that, but hey maybe its a good app 😁)

One day you decide to add Indian Credit Cards as a payment option, you were living in Zen mode till now with the following interface:

```csharp
interface IPaymentProcessor {
	Task ProcessPayment(double amount);
}
```

This is almost never the case, but let's assume that all the existing payment provider classes can easily implement this.

You put our your Nerd specs and fire up Claude Code to do this on a fine afternoon, but turns out RBI has dug your [grave](https://www.linkedin.com/posts/eximpe_fintech-crossborderpayments-rbi-activity-7361773667225141249-cXgd) Requiring notoriously difficult 3D Secure & 3FA Requirements. You like money (Who doesn't) so you must implement this. Right now the blueprint looks nothing like what you want

```csharp
interface IIndianCreditCardPaymentProcessor {
	Task<bool> IsCountrySupported();
	Task Initiate2Fa();
	Task Withdraw(double amount);
}
```

This is where you remember System Design 101 and think that hey I've got a pattern for this!

```csharp
class IndianCcPaymentAdapter(IIndianCreditCardPaymentProcessor indianCcPaymentProcessor) : IPaymentProcessor {
	public async Task ProcessPayment(double amount) {
		if(!IsCountrySupported()){
			// cannot deduct money using this credit card 
		}
		await Initiate2Fa();
		
		await WithDraw(amount);
	}
}
```

### Example: Model Context Protocol Adapters
Of course its 2026 and no set of examples is complete without **AI** in it. In this episode of "I am tired of AI" we bring you MCP Adapters.

Its 2024, you have Silicon Valley Tech bros have hit a wall, they keep pondering the following question: *How do I give my AI more hands?*.

For those of you who don't know AI models are pretty much still a Black box with Input and Output and nothing else. In this case its very difficult to get it to do things if all it can do is read and spit text. Meta (believe or not) was the first to see this and give out a solution called Tools, which has since been universally adapted. 

But a tool is something bas