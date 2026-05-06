> Split an abstraction and its implementation so both can evolve independently.

## Why do I need a bridge?
Bridge tries to solve the problem of god interfaces, when the interface is way too generic and trying to do too many things!

Take the below example:
```cpp
class IDevice {
public:
	virtual void SetVolume() = 0;
	virtual void Enable() = 0;
	virtual void Disable() = 0;
	virtual void StartRecording() = 0;
}
```

Many of the methods in the above class may not be implemented by everyone. For example it makes sense for `SetVolume` to be present on a device with a speaker, but not on a `Fan`, this is a classic violation of [[ISP]]. 

A really easy way t0 spot Bridges in your code is having class names such as:

```bash
Remote
 ├── TVRemote
 ├── RadioRemote
 ├── SmartTVRemote
 └── ProjectorRemote
```

This means Remote is probably too generic for you, a better way to approach this would be to use a bridge and 2 interfaces:
- `IRemote`
- ``