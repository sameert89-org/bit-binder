> 	Instead of doing `object.doSomething()` command converts it into `somethingCommand(object)` this converts the action to a **first class object** means now you can *store,queue,undo, retry or schedule* it. This also decouples the caller from the object on which the action is to be executed, the caller just knows about the command.

## Example: Undo Redo in an Editor

This is a classic example of using the command pattern.  

```csharp
public class Document{}

public interface ICommand
{
    public void Execute();

    public void Undo();
}

public class InsertTextCommand(string text, Document document) : ICommand
{
    public void Execute()
    {
        throw new NotImplementedException();
    }

    public void Undo()
    {
        throw new NotImplementedException();
    }
}

public class CommandHistory
{
    private readonly Stack<ICommand> _history = new Stack<ICommand>();

    public void Execute(ICommand command)
    {
        command.Execute();
        _history.Push(command);
    }
    
    public void Undo()
    {
        if (_history.Count > 0)
        {
            var command = _history.Pop();
            command.Undo();
        }
    }
    
}
```

The command history keeps track of the commands which are already executed and then they can be undone. Every command implements the `execute` and `undo`.

