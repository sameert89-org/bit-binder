> A facade provides a simplified interface to a complex set of classes.

### Why do I need a Facade?
Modern systems are complex, there are hundreds of different components, external libraries, duct tape and hope holding things together, when a client actually wants to use this system it should not have to know the internals of how things work! A Facade helps with exactly this, by only showing what clients need.

### Example:  A nuclear reactor
Here is an example straight from <span style="color: #39FF14">Chernobyl</span>

In our nuclear reactor we have 3 critical components:
1. **The Coolant Pump:** This is used