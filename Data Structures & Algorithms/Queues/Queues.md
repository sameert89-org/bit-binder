A queue is a FIFO data structure (First in First Out) The element which is inserted first is removed first.

Have you stood in the line for getting something? The person at the **front** of the queue, gets things done first and comes out of the queue. If any new person wants to join they must do so at the **back** of the queue (unless they are total jerks and cut into the queue).
below is the implementation of a queue in python.

I mean there are overflow and underflow conditions in a fixed size queue well the below one is dynamic implementation which is used just about everywhere. I am using arrays, but something like a linked list would be way more efficient.

```python
class queue:
	def __init__(self):
		self.base = []
	def __len__(self):
		return len(self.base)
	def front(self):
		if self.base: return self.base[0]
		else: raise IndexError("Underflow, Queue is empty")
	def push(self, val):
		self.base.append(val)
	def pop(self):
		if self.base:
			return self.base.pop(0)
		else: raise IndexError("Underflow, Queue is empty")
```

CPP comes with STL queues so use them whenever needed.

Quick note on try catch and except/throw(cpp). throw is used for throwing errors in code if something is wrong, try and catch are just wrappers that handle the error, you try a piece of code if there is the problem a nicely written code should throw some error which is detected by the catch block and then passed on to the catch block. And then their is finally which gets executed anyways.

There are also doubly ended queues called deques which can serve both the purpose of deque and stack.

## Circular Queues

I hate this from the bottom of my heart. I always write shitty code for this, here is a clean one for you tho.

Important Logic, rear and front are going to always loop around if they go out of range.

![[Drawing 2023-08-31 21.48.45.excalidraw]]

```python
class MyCircularQueue:

    def __init__(self, k: int):
        self.capacity = k
        self.queue = [0] * k
        self.front = self.rear = -1

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        
        if self.isEmpty():
            self.front = self.rear = 0
        else:
            self.rear = (self.rear + 1) % self.capacity
        
        self.queue[self.rear] = value
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        
        return True

    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[self.front]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[self.rear]

    def isEmpty(self) -> bool:
        return self.front == -1

    def isFull(self) -> bool:
        return (self.rear + 1) % self.capacity == self.front

```

Read More about heap queues [[Heaps]]