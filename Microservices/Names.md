#clean_code 

- Reveal your intent, if you need a comment to support the intent then your chosen name is wrong.
- If you have to go to the code to understand a name, its a bad name. 
- Avoid disinformation
- Pronounceable names
- Avoid encoding (obfuscating the names)


| Type       | Tip                                                                |     |
| ---------- | ------------------------------------------------------------------ | --- |
| Boolean    | should be written as predicates 'isEmpty', 'isWritten'             |     |
| Method     | Usually written as a verb, but if it returns boolean use predicate |     |
| Properties | Nouns                                                              |     |
| Enum       | Adjectives (usually)                                               |     |

> *"Clean code reads like a well written prose"*


### Scope rule
#### Variables
The longer the scope the longer and more descriptive the variable name should be.
The shorter the scope the shorter the variable name could be.

#### Functions and Classes
Opposite of variables
The longer the scope the shorter the class/method name should be. The shorter the scope the longer the class/method name should be.

Public functions are nice to have short names of. Because they are supposed to be used outside (larger scope)
Private short scoped functions with long names serve as self documentation.

*Derived classes are an exception, because we usually put adjectives in their names. So longer the chain the longer the names get.*

# Summary
1. Choose names thoughtfully
2. Communicate your intent
3. Avoid Disinformation
4. Pronounceable names.
5. Avoid Encodings.
6. The Scope Rule