## Using Statements
From .NET 6, there is a concept of implied using statements, you no longer need to write `using System` and other common **libraries** again and again. `using` statements refer to the namespace.
### Namespaces & Sub-namespaces
Namespaces are essentially the library that you are developing, sub-namespaces are namespaces inside namespace, conventionally named as `parentNamespace.subNamespace` *inside* the `parentNamespace` they can be simply accessed by `subNamespace.member` but *outside* or while including using `using` you would need the full namespace name. 

> [!warning] Ambiguous References
> Using `using` statements may cause the issue of ambiguous reference, if 2 included namespaces have the same definition then C# would not know which member to access.

You can stuff 😏 your own crap on other namespaces. Below is how you stuff Microsoft's namespace.

```c#
namespace System{
	public static void hotdog(){
		System.Console.Write("Stuffed Successfuly");
	}
}
```

#### Namespace Aliases
If a namespace's name is a mouthful 🍆, you can use aliases.

```c#
using DumbNamespace = My.Ridiculously.Long.Personality;
```

#### .NET 6
From this version the general template for the .NET applications was cut short.
## Using Statements
From .NET 6, there is a concept of implied using statements, you no longer need to write `using System` and other common **libraries** again and again. `using` statements refer to the namespace.
### Namespaces & Sub-namespaces
Namespaces are essentially the library that you are developing, sub-namespaces are namespaces inside namespace, conventionally named as `parentNamespace.subNamespace` *inside* the `parentNamespace` they can be simply accessed by `subNamespace.member` but *outside* or while including using `using` you would need the full namespace name. 

> [!warning] Ambiguous References
> Using `using` statements may cause the issue of ambiguous reference, if 2 included namespaces have the same definition then C# would not know which member to access.

You can stuff 😏 your own crap on other namespaces. Below is how you stuff Microsoft's namespace.

```c#
namespace System{
	public static void hotdog(){
		System.Console.Write("Stuffed Successfuly");
	}
}
```

#### Namespace Aliases
If a namespace's name is a mouthful 🍆, you can use aliases.

```c#
using DumbNamespace = My.Ridiculously.Long.Personality;
```

#### .NET 6
From this version the general template for the .NET applications was cut short. By default it uses file-folder based namespaces, the root folder is the current namespace.
You can change it by doing `namespace myNamespace;` note the *absence* of curly braces. 


> [!note] One Namespace Per File
> C# 10 allows only one namespace per file if you are using the above using syntax, you can use curly braces to separate the code between namespaces.

Editing these global usings can be done from the *global usings* file or from the project settings like below-
<div align="center">
</div>

![[Pasted image 20240303203641.png|400]]


> [!done] Code is Meant for Humans
> Write code not for the machine but for other developers.


[[Top Level Statements]]