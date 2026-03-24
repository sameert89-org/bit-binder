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