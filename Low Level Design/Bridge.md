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

Many of the methods in the above class may not be implemented by everyone. Fthis is a classic violation of [[ISP]]. 