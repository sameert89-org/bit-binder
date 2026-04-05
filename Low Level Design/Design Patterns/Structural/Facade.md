> A facade provides a simplified interface to a complex set of classes.

### Why do I need a Facade?
Modern systems are complex, there are hundreds of different components, external libraries, duct tape and hope holding things together, when a client actually wants to use this system it should not have to know the internals of how things work! A Facade helps with exactly this, by only showing what clients need.

### Example:  SCRAM in a nuclear reactor
Here is an example straight from <span style="color: #39FF14">Chernobyl</span>

In our nuclear reactor we have 3 critical components:
1. **The Coolant Pump:** This is used to run water and cool down the reactor core.
2. **The Rod Actuator:** This component controls the graphite rods which absorb excess neutrons and help prevent a reactor meltdown.
3. **The Flux Monitor:** This monitors the flux (flow) of neutrons in a reactor.

If something goes wrong during the Fission reaction all 3 must act to do something called as a **SCRAM**, it is an emergency procedure used to control the reactor and prevent a meltdown!

Now you the operator want to trigger this via the giant red button!

![[Pasted image 20260324235526.png|200]]

Would you want to be this guy and press 3 different buttons, not sure which to push first?  You *the client* should not have to rely on these low level details in order to do your job.

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

### Example: ScrapingBee
Its 2026 everyone is trying to steal data from the websites to train the next **S**tate-**O**f-**T**he-**A**rt AI model. The websites know this and they don't want to become the next stack overflow with people never clicking on them and use AI to get what they want.

That's why they take a tonne of countermeasures to prevent scraping:
1. `robots.txt` Silicon Valley tech bros laughing on this point
2. Captchas: This prevents humans more than AI bots I figure
3. Rate Limiting
4. IP Blacklisting
5. Geo Restrictions

Let's be honest its a war you cannot win and let's join the Darkside! and try to see how a Facade can help us scrape the entire web.

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