From `.NET 6` onwards i.e. the advent of `.NET core` you don't need to write the basic boilerplate-
```c#
using System;
namespace Application {
	class Program {
		static void Main(string[] args) { 
			 Console.WriteLine("Hello World!"); 
		 } 
	} 
}
```

Instead they introduced *top-level statements* basically everything you write outside a block inside a C# file, is included inside the namespace `projectName`, class `Program` & a static entry point `void Main`.  