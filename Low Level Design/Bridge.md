> Split an abstraction and its implementation so both can evolve independently.

## Why do I need a bridge?
It is usual to get into inheritance hell, take a look at the following class

```cpp
class Remote {
public:
	virtual void TogglePower();
};
```

Now you needed to make a *Voice Remote*, then its natural to do something like below:

```cpp
class TVRemote : public Remote {
public:
	void TypeWithVoice();
	void SetVolume() override;
	void TogglePower() override;
}
```

Then you wanted an *AC remote* one after the other, you realize that the `Remote` interface is not enough to *compose* the diversity in its children.

Bridge tries to solve this inheritance chain by replacing it with composition. Instead of `DeviceRemote` being a child of `Remote` the `Device` composes its remote.

There is a clean bridge between the *Device* and the *Remote*.

![[Bridge 2026-05-06 23.13.58.excalidraw]]

### Example: `.NET` Streams
This example is not limited to `.NET` but it is very clearly visible in the way its implemented in `.NET`

> [!INFO] What is a stream
> A stream is a sequence of data elements made available over time. Streams are generally categorized based on the channel they flow through, we have *MemoryStreams* *FileStreams* *NetworkStreams* etc.

```csharp
public abstract class Stream {
	public BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) {};
	public BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) {};
	public Close() {};
}
```

Above is the actual `Stream` class present in `.NET` though only a few of the methods are listed here.
Now based on the channel we would have the following:

```csharp
public class MemoryStream : Stream {}
public class FileStream : Stream {}
public class BufferedStream : Stream {}
// and many more
```

This is fine till now. 