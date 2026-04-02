> A **proxy** is a middleman, which controls access to the real object.

### Why do I need a Proxy?
 A proxy is useful when you want to control, filter, or secure access to the real object without exposing it directly. It acts as an intermediary allowing for additional logic - such as lazy initialization, logging or security checks.

A proxy is made up of 3 main components:
- *Shared interface*
- *Real Object*
- *Proxy*

![[Proxy 2026-04-02 20.57.58.excalidraw]]


> [!Question] How is this different from [[Adapter]]?
> The main difference between a *proxy* and and *adapter* is that the proxy shares interface and only adds functionality IT NEVER CHANGES the interface the client was expecting, where as *adapter*  changes the interface to match what the client expects.

### Example: Rihanna's Manager
![[Pasted image 20260402231411.png]]

When Anant Ambani wanted Rihanna to perform at his wedding, did they message her on WhatsApp directly? Well after typing that I realize that they could've, but that's beside the point. Let's say someone less richer wanted to book Rihanna for their wedding they would contact her manager instead of Rihanna directly.

In this case the manager is acting as a proxy for Rihanna.

Rihanna's Original Interface would look like this with a lot of things that are not required for everybody.

```csharp
public interface IRihanna
{
    void Perform();
    void BookWedding();
}
```

You could not go through her directly its very difficult to do so, how would the venue work, how much would be the payment, what is her availability etc. etc. 

 So the manager would expose a simpler interface like this:

```csharp
public interface IPeterGriffinTalentAgency
{
    void BookWedding();
}
```

 The manager can then handle the details, check availability, negotiate payment, and only if everything is fine, forward the request to Rihanna. It is important to notice here that `BookWedding` has the same name but there is a lot of added functionality inside, before this is forwarded to Rihanna.

### Example : VPNs
Here is to another modern day snake-oil 🍷 that is VPNs. You believe 50 thousandth `GlennQuagmiresTotallyLegitSecureVPN.apk` isn't selling your data? God bless you.

But hey every bad has a good in it, we can learn about one of the biggest modern day example of Proxy Patterns via VPNs!

> For courtesy here is the definition: A VPN works by routing your internet traffic through a remote server, so websites see the VPN server’s IP address instead of yours.

![[Proxy 2026-04-02 23.19.08.excalidraw]]