> Split an abstraction and its implementation so both can evolve independently.

## Why do I need a bridge?

It is easy to get into inheritance hell. Consider the following class:

```cpp
class Remote {
public:
	virtual void TogglePower();
};
```

Now you need to make a voice remote, so it is natural to do something like this:

```cpp
class TVRemote : public Remote {
public:
	void TypeWithVoice();
	void SetVolume() override;
	void TogglePower() override;
}
```

Then you want an AC remote. As more remote types are added, you realize that the `Remote` interface is not enough to represent the diversity among its children.

Bridge solves this inheritance chain by replacing it with composition. Instead of `DeviceRemote` being a child of `Remote`, a remote composes a `Device`.

There is a clean bridge between the `Device` and the `Remote`.

![[Bridge 2026-05-06 23.13.58.excalidraw]]

## Example: .NET streams

This example is not limited to .NET, but it is clearly visible in the way streams are implemented there.

> [!INFO] What is a stream?
> A stream is a sequence of data elements made available over time. Streams are generally categorized by the channel they flow through, such as `MemoryStream`, `FileStream`, and `NetworkStream`.

```csharp
public abstract class Stream {
	public BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) {};
	public BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) {};
	public Close() {};
}
```

Above is the actual `Stream` class present in .NET, though only a few methods are listed. Based on the channel, we could have the following implementations:

```csharp
public class MemoryStream : Stream {}
public class FileStream : Stream {}
public class BufferedStream : Stream {}
// and many more
```

This works, but a `Byte[]` can be intimidating to work with, so Microsoft provides the following abstractions:

```csharp
public class StreamReader(Stream stream) {}
public class StreamWriter(Stream stream) {}
```

This is a clean example of Bridge where readers and streams can evolve independently. We can also see that `StreamReader` composes a `Stream`.

Without Bridge, the design would look something like this:

```csharp
public class MemoryStreamReader {};
public class FileStreamReader {};
public class MemoryStreamWriter {};
public class FileStreamWriter {};
```
