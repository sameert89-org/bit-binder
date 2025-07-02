Variables and functions declarations are moved to the top of their scope, this behavior is known as *hoisting*.
var, let and const are all hoisted but only var is initialized to undefined so its accessible before its declaration. 
Let and const are hoisted and they are placed in the temporal dead zone (TDZ), you get a *ReferenceError* if you try to access their values before declaration.