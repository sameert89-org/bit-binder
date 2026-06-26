> Mediator = a middleman object that coordinates communication between related objects.

## Why do I need a Mediator?
Imagine you are flying a plane & obviously you are not the only one doing it. Let's say you want to land, how do you know whether the runway is prepared for you to land? Do you ask each and every plane in the vicinity?

That's where the mediator *Air traffic control* comes into play.

```
Plane A -> Control Tower
Plane B -> Control Tower
Plane C -> Control Tower
```

The control tower decides who can land, who must wait, and which runway is available.