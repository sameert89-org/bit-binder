> 	Instead of doing `object.doSomething()` command converts it into `somethingCommand(object)` this converts the action to a **first class object** means now you can *store,queue,undo, retry or schedule* it. This also decouples the caller from the object on which the action is to be executed, the caller just knows about the command.

## Example: Undo Redo in an Editor

This is a classic example of using the command pattern.  