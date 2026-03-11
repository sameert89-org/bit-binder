![[Pillars Of Oops]]

| **Pillar**        | **Definition**                                                                                                                                    | **Short Code Snippet (C++)**                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Encapsulation** | Bundling data and methods into a single unit (class) and restricting direct access to components to protect data integrity.                       | `class Bank { private: double bal; public: void setBal(double b) { bal = b; } };` |
| **Abstraction**   | **Hiding Complexity + Showing Essentials**                                                                                                        | `class Shape { public: virtual void draw() = 0; }; // Pure virtual function`      |
| **Inheritance**   | A mechanism where a new class (child) acquires the properties and behaviors of an existing class (parent), promoting code reuse.                  | `class Dog : public Animal { public: void bark() { cout << "Woof!"; } };`         |
| **Polymorphism**  | The ability of a single interface to represent different underlying forms (e.g., a function behaving differently based on the object calling it). | `void sound() { cout << "Generic"; } void sound(int volume) { /* Overloaded */ }` |
|                   |                                                                                                                                                   |                                                                                   |
