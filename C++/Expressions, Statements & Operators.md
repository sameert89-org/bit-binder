A **statement** is an instruction that _performs_ an action but does **not return a value**.
An **expression** is code that _evaluates to a value.

## Operators
Following are the most common operators in C++, with priority.

|Precedence|Operator(s)|Description / Usage|Associativity|
|---|---|---|---|
|1|`::`|Scope resolution|Left|
|2|`()` `[]` `->` `.` `++` `--`|Function call, array subscript, member, postfix inc/dec|Left|
|3|`++` `--` `+` `-` `!` `~` `*` `&` `new` `delete` `sizeof` `(type)`|Prefix inc/dec, unary plus/minus, logical/bitwise NOT, cast|Right|
|4|`.*` `->*`|Pointer-to-member|Left|
|5|`*` `/` `%`|Multiplication, division, modulus|Left|
|6|`+` `-`|Addition, subtraction|Left|
|7|`<<` `>>`|Bitwise shift left/right|Left|
|8|`<` `<=` `>` `>=`|Relational operators|Left|
|9|`==` `!=`|Equality operators|Left|
|10|`&`|Bitwise AND|Left|
|11|`^`|Bitwise XOR|Left|
|12|`&#124;`|Bitwise OR|Left|
|13|`&&`|Logical AND|Left|
|14|`&#124;&#124;`|Logical OR|Left|
|15|`?:`|Ternary conditional|Right|
|16|`=` `+=` `-=` `*=` `/=` `%=` `&=` `^=` `&#124;=` `<<=` `>>=`|Assignment, compound assignment|Right|
|17|`,`|Comma|Left|

**Associativity** in C++ is the rule that determines the _direction_ in which operators of the same precedence are grouped and evaluated within an expression, especially when there are two or more such operators without parentheses.

> [!NOTE] Short Circuit Expression
> Like other languages there is support for short circuit expressions, means in a chain of evaluation if one expression is false and following it is an && then the evaluation stops at the point.

> [!INFO] Mixed Type Expressions
> C++ Operations occur on the same type operands, if operands are of different types C++ will *try* to convert one using one the following methods:
> - Type coercion: Simple conversion of one operand.
> - Promotion: Conversion to a higher type (int to double) 
> - Demotion: Conversion to a lower type (types with larger sizeof have higher priority in conversion, bool → char → short → int → uint → long → long long → float → double → long double)
>  Furthermore its possible to "cast" types
> - Implicit Type Casting: Type casting done automatically by the compiler
> - Explicit Type Casting: 
>   C style cast= (type)a;
>   static_cast<type>(variable_name)



