**Created:** 2024-03-04 16:31
**Last Modified:** Monday 4th March 2024 16:31:45
**Author:** Sameer89

*Decimals* are more precise counterparts of doubles, it plays a critical role in financial applications, following are the important properties-
- They are stored in 128 bit data structure. 
- Less performant compared to `float` and `double`. Require more CPU cycles.
- Free from floating point / rounding errors.
- The precision is upto 28 decimal places, unlike 15-16 of doubles.
```csharp
decimal bankBalance = 2.44M; // M or m suffix is required to represent the decimal
```

Also Read: [[Double Datatype]]