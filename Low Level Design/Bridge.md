> Split an abstraction and its implementation so both can evolve independently.

## Why do I need a bridge?
It is usual to get into inheritance hell, take a look at the following class

```cpp
class Remote {
public:
	void SetVolume();
	void TogglePower();
};
```

Now you needed to make a *Voice Remote*, then its natural to do something like below:

```cpp
class VoiceRemote : public Remote {
public:
	void TypeWithVoice();
	void SetVolume() override {};
	void TogglePower() override {};
}
```