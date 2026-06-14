> **Observer:**	Just remember this as *notify*, using this you can define a subscription to notify multiple objects to an event.

## Why do I need an observer?
How does one know when a certain event has occurred? Sure you can poll the object in question but that results in unnecessary calls. Observer helps with just that.

## Example: Newsletters
Probably the simplest and the most straightforward example of the observer pattern. You simply provide your email to the newsletter and it sends you an email everytime a new edition of the newsletter arrives. 

Here you are the observer and newsletter is the thing you are observing.

```csharp
public class Newsletter
{
    private readonly HashSet<string> _subscribers = [];
    
    public void Subscribe(string email)
    {
        _subscribers.Add(email);
    }
    public void Unsubscribe(string email)
    {
        _subscribers.Remove(email);
    }
    public void Notify(string news)
    {
        foreach (var subscriber in _subscribers)
        {
            Console.WriteLine($"sent email to {subscriber} with message: {news}");
        }
    }
}
```