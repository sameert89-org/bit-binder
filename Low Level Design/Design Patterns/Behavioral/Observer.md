> Observer defines subscriptions that notify multiple objects when an event occurs. Just remember it as *notify*.

## Why do I need an observer?
How does an object know when an event has occurred? You could poll the object in question, but that results in unnecessary calls. Observer solves this problem.

## Example: Newsletters
This is probably the simplest example of Observer. You provide your email to a newsletter, and it sends you an email whenever a new edition arrives.

You are the observer, and the newsletter is the subject you are observing.

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

## Example: JavaScript DOM events

This is another classic example of Observer. Any event listener you add uses this pattern under the hood.

```js
const button = document.querySelector('button');

// Named callback function
function handleButtonClick(event) {
  console.log('Button clicked!', event.target);
}

// Attach the listener
button.addEventListener('click', handleButtonClick);
```
