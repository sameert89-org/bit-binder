> A facade provides a simplified interface to a complex set of classes.

## Why do I need a facade?

Modern systems are complex. There can be hundreds of components, external libraries, duct tape, and hope holding things together. A client should not need to understand those internals. A facade helps by showing clients only what they need.

## Example: SCRAM in a nuclear reactor

Here is an example straight from <span style="color: #39FF14">Chernobyl</span>.

Our nuclear reactor has three critical components:

1. **Coolant pump:** Runs water to cool down the reactor core
2. **Rod actuator:** Controls the graphite rods that absorb excess neutrons and help prevent a meltdown
3. **Flux monitor:** Monitors the flux, or flow, of neutrons in the reactor

If something goes wrong during the fission reaction, all three must perform a **SCRAM**, an emergency procedure used to control the reactor and prevent a meltdown.

As the operator, you want to trigger this using the giant red button.

![[Pasted image 20260324235526.png|200]]

Would you want to be this guy, pressing three different buttons without knowing which to push first? You, *the client*, should not have to rely on these low-level details to do your job.

Facade to save the day!

```cpp
#include <iostream>
#include <format>

class CoolantPump {
private:
	double _flowRate {0.0};
public:
	double getFlowRate() {
		return _flowRate;
	};
	void setFlowRate(double desiredRate) {
		_flowRate = desiredRate;
	};
};

class FluxMonitor {
private:
	double _fluxRate;
public:
	double getNeutronFlux() {
		return _fluxRate;
	}
};

class RodActuator {
public:
	void setRodPosition(double desiredPosition) {

	}
	double getCurrentPosition() {
		return 450.2;
	}
};

class ReactorFacade {
private:
	CoolantPump _mainPump;
	RodActuator _actuator;
	FluxMonitor _fluxMonitor;
public:
	void emergencyScram(){
		_mainPump.setFlowRate(1500.0); // set it high to cooldown the reactor
		_actuator.setRodPosition(1000.0); // dip the rods in

		auto finalFlux = _fluxMonitor.getNeutronFlux();

		std::cout << std::format("Post SCRAM flux rate: {}", finalFlux);
	}
};
```

## Example: ScrapingBee
It is 2026, and everyone is trying to steal data from websites to train the next state-of-the-art AI model. Websites know this, and they do not want to become the next Stack Overflow, with people using AI to get the yolk without clicking through the shell.

That is why they take a tonne of countermeasures to prevent scraping:

1. `robots.txt`: Silicon Valley tech bros are laughing at this point
2. CAPTCHAs: These prevent humans more than AI bots, I guess
3. Rate limiting
4. IP blacklisting
5. Geo-restrictions

Let's be honest: it is a war you cannot win. Let's join the Dark Side and see how a facade can help us scrape the entire web.

![[Pasted image 20260325001651.png]]

```csharp
class ProxyPool
{
	public GetResidentialIp()
	{
		return "49.153.14.28";
	}
}

class CaptchaBuster {
	public string SolveCaptcha() {
		// solve using OCR
		return "https://solved.site.com";
	}
}

class BrowserRenderer {
	async Task RenderJs(string url) {
		// render complex js
		return Task.CompletedTask;
	}
}

class ScrapingFacade(BrowserRenderer browserRenderer, CaptchaBuster captchaBuster, ProxyPool proxyPool) {
	public async Task<string> GetSiteContent(string url) {
		var ip = proxyPool.GetResidentialIp();
		await browserRenderer.RenderJs(url);
		var result = captchaBuster.SolveCaptcha();

		return result;
	}
}
```
