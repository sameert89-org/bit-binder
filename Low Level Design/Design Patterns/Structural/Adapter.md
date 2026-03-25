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
Of course, it’s 2026, and no set of examples is complete without **AI** in it. In this episode of _"I am tired of AI,"_ we bring you **MCP Adapters**.

Back in 2024, Silicon Valley tech bros hit a wall. They kept pondering one specific question: _"How do I give my AI more hands?"_

For those who don't know, AI models are still largely "black boxes" with inputs and outputs—and nothing else. It is incredibly difficult to get a model to actually _do_ things if all it can do is ingest and spit out text. OpenAI was the first to address this with a solution called **Tools** (Function Calling), which has since been universally adopted.

However, a "tool" is often basic: open a file, read text, or search the web. As AI evolved, developers craved integrations with more complex upstream systems.

At this point, you might wonder: _"Aren't APIs a thing?"_ Well, buster, APIs come in all shapes, sizes, and forms. If I sat around integrating individual APIs all day, I’d be 63 million years old before I was finished. Anthropic realized this and introduced **MCP** (Model Context Protocol). It’s a standardized set of rules that the AI already knows how to navigate. If you want your app to be "touched" by the billion-dollar sentient robot, you must implement this protocol.

Naturally, everyone jumped the tracks to implement it, and it has become the norm. Some of the most popular MCP servers in 2026 include:

1. **GitHub MCP Server**
2. **Firecrawl**
3. **Browserbase**
4. **Notion**

If you look closely, you’ll see that these are all **adapters** under the hood—taking a specific implementation and making it "AI-agent ready."

```cpp

```
