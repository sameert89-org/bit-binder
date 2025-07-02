**Created:** 2024-03-04 16:58
**Last Modified:** Monday 4th March 2024 16:58:19
**Author:** Sameer89

In `.NET` `null` represents the absence of a value. A `null` variable or object reference does not point to any location on the memory.  Following are the important properties of `null`-
- **Value types cannot be `null` but reference types can be null.** This maybe quite confusing since we have seen `int?, bool?` etc. But a nullable type is not same as its base type. Behind the scenes a nullable value represents the generic struct `System.Nullable<T>` this has a couple of properties: *bool HasValue* and *T value* both tell whether the variable has been assigned a value or not and the actual value if assigned respectively.
- In C# 8.0 and later, reference types are assumed to be non nullable, this helps avoid the `NullReferenceException`. Now reference types can be followed by `?` to tell the compiler that they maybe null. 