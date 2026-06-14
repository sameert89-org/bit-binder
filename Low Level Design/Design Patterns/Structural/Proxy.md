> A **proxy** is a middleman that controls access to the real object.

## Why do I need a proxy?

A proxy is useful when you want to control, filter, or secure access to the real object without exposing it directly. It acts as an intermediary that allows additional logic, such as lazy initialization, logging, or security checks.

A proxy has three main components:

- **Shared interface:** The contract shared by the proxy and real object
- **Real object:** The object receiving the forwarded request
- **Proxy:** The object controlling access

![[Proxy 2026-04-02 20.57.58.excalidraw]]

> [!QUESTION] How is this different from [[Adapter]]?
> A proxy shares the real object's interface and adds functionality; **it never changes the interface the client expects**. An adapter changes an interface to match what the client expects.

## Example: Rihanna's manager

![[Pasted image 20260402231411.png]]

When Anant Ambani wanted Rihanna to perform at his wedding, did they message her on WhatsApp directly? Well, after typing that, I realize they could have, but that is beside the point. Let's say someone less rich wanted to book Rihanna for a wedding. They would contact her manager instead of Rihanna directly.

In this case the manager is acting as a proxy for Rihanna.

Rihanna's original interface could look like this:

```csharp
public interface ICelebrityPerformer
{
    void Perform(string venue, decimal offeredFee);
}
public class Rihanna : ICelebrityPerformer
{
    public void Perform(string venue, decimal offeredFee)
    {
        Console.WriteLine($"Rihanna performs at {venue}.");
    }
}
```

Going through her directly would be difficult. How would the venue work? How much would the payment be? What is her availability?

The manager exposes the same interface while handling those access checks:

```csharp
public class ManagerProxy : ICelebrityPerformer
{
    private readonly ICelebrityPerformer _real;
    private readonly decimal _minimumFee;

    public ManagerProxy(ICelebrityPerformer real, decimal minimumFee)
    {
        _real = real;
        _minimumFee = minimumFee;
    }

    public void Perform(string venue, decimal offeredFee)
    {
        if (offeredFee < _minimumFee)
        {
            Console.WriteLine($"Manager: rejected (need at least {_minimumFee}).");
            return;
        }

        Console.WriteLine("Manager: approved.");
        _real.Perform(venue, offeredFee);
    }
}
```

The manager can handle the details, check availability, negotiate payment, and forward the request to Rihanna only when everything is fine.

## Example: VPNs

Here is another modern-day snake oil 🍷: VPNs. You believe the 50,000th `GlennQuagmiresTotallyLegitSecureVPN.apk` is not selling your data? God bless you.

But hey, every bad thing has some good in it. We can learn about one of the biggest modern-day examples of Proxy through VPNs!

> A VPN routes your internet traffic through a remote server, so websites see the VPN server's IP address instead of yours.

![[Proxy 2026-04-02 23.19.08.excalidraw]]

When you connect to a website through a VPN, your requests go to the VPN server first. The VPN server forwards them to the real website, so the website sees the VPN server instead of you while you continue using the internet normally.

In this case:

- **Client:** Any program running on your phone
- **Real object:** The destination web server
- **Proxy:** The VPN

To an app running on your phone, the common interfaces are HTTP and HTTPS. Data is first sent to the proxy server, or VPN server, which then forwards it to the destination server.

Below is a simplified C++ example:

```cpp
#include <iostream>
#include <string>

struct IHttpClient {
    virtual ~IHttpClient() = default;
    virtual std::string get(const std::string& url) = 0;
};

class RealHttpClient : public IHttpClient {
public:
    std::string get(const std::string& url) override {
        return "200 OK from " + url;
    }
};

class VpnProxy : public IHttpClient {
    IHttpClient& real;
    std::string vpnIp;

public:
    VpnProxy(IHttpClient& real, std::string vpnIp)
        : real(real), vpnIp(std::move(vpnIp)) {}

    std::string get(const std::string& url) override {
        std::cout << "[VPN " << vpnIp << "] encrypting & forwarding GET " << url << "\n";
        return real.get(url);
    }
};

int main() {
    RealHttpClient internet;
    VpnProxy vpn(internet, "203.0.113.10");

    IHttpClient& client = vpn;
    std::cout << client.get("https://example.com") << "\n";
}
```

There are many other great examples of proxies like `nginx`. Read more about proxies [here](https://notes.kernelrider.in/Microservices/proxies-and-reverse-proxies.html)
