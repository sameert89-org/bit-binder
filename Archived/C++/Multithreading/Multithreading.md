**What is a thread?**
A thread is the smallest unit of execution, it only has its stack and registers and shares other resources with the parent process.

## Basics of Threading in C++

#### Creating a thread

Every C++ program has the main thread as the base.

The basic syntax to create a thread is `std::thread t1(F, args...)`, here F is the function that will be run by the thread and  `args` are the arguments passed to the function.

Below is a basic example of creating and running a thread.


```cpp
#include<thread> // introduced in C++ 11
int printNumbers(int n) {
	for(int i = 1; i <= n; i++)
		cout << i << endl;
}
int main() {
	std::thread t(printNumbers, 10);
	// as soon as the the thread is created it starts executing
	
	t.join(); // This joins it back into main thread, we will wait for the thread to finish execution here
	
	return 0;
}
```

#### `F`
We talked about `F` what is F exactly, in modern C++ F can be any of the following:

1. Function Pointers: C style way of passing functions around, pointer to compiled code of the function
2. Functors: A class that overloads the `()` operator and can be called using `()`, very common in STL custom compare structs
3. Lambda Functions
4. std::function
5. Non static Member function of a class
6. Static member function of a class

```cpp
#include<thread> // introduced in C++ 11
#include<iostream>
#include<cmath>
#include<functional>

using namespace std;

void printNumbers(int n) {
	for(int i = 1; i <= n; i++)
		cout << i << endl;
}

class Add {
public:
	int operator()(int a, int b) {
		return a + b;
	}
};

function<int(int, int)> diff = [](int x, int y) {
	return abs(x - y);
};

class Base {
public:
	void run(int x) {
		while(x-- > 0)
			cout << x << endl;
	}
	
	static double distanceFromOrigin(int x, int y) {
		return sqrt(x * x + y * y);
	}
};

int main() {
	thread fp(printNumbers, 20); // this internally resolves to void (*f)(int ,int) = printNumbers
	
	thread ftor(Add(), 10, 20);
	
	thread lmbda([](int x) { return x * x; }, 5);
	
	thread stdFunction(diff, 10, 20);
	
	Base b;
	thread nonStaticMemFunc(&Base::run, &b, 50);
	
	thread staticMemFunc(&Base::distanceFromOrigin, 10, -10);
}
```


> [!Warning] Double Joins = System Error
> Double joins are not allowed and make the program crash, you should first check if a thread is *joinable* using `t.joinable()` then only call `join` on it.

### `detach`

*Let this thread run independently. I will not `join()` it later*

When the process exits the detached threads are killed.

If a joinable thread object is destroyed without join() or detach(), the program calls: `std::terminate()`

![[Pasted image 20260424191417.png]]

It is rarely used for *fire and forget* work.

## Mutexes

Mutex is short for Mutual Exclusion.

Its a lock that ensures only one thread can use a shared resource at a time.

Look at the below race condition:

```cpp
#include<thread>
#include<iostream>
#include<functional>
int main() {
	int x = 0;
	
	std::function<void()> f = [&](){
		for(int i = 0; i < 1000000; i++)	
			x++;
	};
	std::thread t1(f);
	std::thread t2(f);

	t1.join();
	t2.join();
	
	std::cout << x; // expected 2000000
}
```

The result is undefined but generally smaller than the desired result, since the threads race and overwrite each other's progress, this is only evident on larger datasets since on smaller ones the code just executes before such interleaving could happen.

```cpp
#include<thread>
#include<iostream>
#include<functional>
#include<mutex>
int main() {
	int x = 0;
	std::mutex m;
	std::function<void()> f = [&](){
		for(int i = 0; i < 1000000; i++){
			m.lock();
			x++;
			m.unlock();
		}
	};
	std::thread t1(f);
	std::thread t2(f);

	t1.join();
	t2.join();
	
	std::cout << x; // expected 2000000
}
```

This will make sure:
- Try acquire the lock
- if cant acquire wait
- do the operation

But this is almost never used in real world, since if the code between `lock` & `unlock` *excepts* then unlock is never called.

There is a better alternative called lock_guard which ensures unlock is auto called when lock goes out of scope

```cpp
#include <iostream>
#include <mutex>
#include <thread>

std::mutex mtx;
int counter = 0;

void increment() {
    for (int i = 0; i < 100000; i++) {
        std::lock_guard<std::mutex> lock(mtx);
        counter++;
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);

    t1.join();
    t2.join();

    std::cout << counter << "\n"; // 200000
}
```

- There is a `try_lock` method as well. Well there are many `try_locks`
### Types of Locks

Locks are more or less wrappers over the lock methods of mutexes but they offer several advantages, the main one being not having to unlock the mutexes manually before the lock goes out of scope.
### `mutex.lock()`

This is the manual lock of mutexes, this:
- Must be unlocked  otherwise it could result in deadlocks
- Results in deadlocks if there is an exception the code following the lock.
- Cannot recursively lock
- Works with any mutex

```cpp
std::mutex m;
m.lock();
// do processing
m.unlock();
```

### `lock_guard`

This type of lock:
- Automatically calls `unlock` when the lock goes out of scope
- Cannot be unlocked prematurely
- Works with any mutex

```cpp
std::lock_guard<std::mutex> lock(m);
// do processing
```

### `unique_lock`

This lock:
- Automatically calls  unlock when the lock goes out of scope
- It can be unlocked and locked again (unlike lock_guard) and supports deferred locking/try_lock.
- Works with any mutex type


> [!Question]  What is deferred locking
> Create the lock but do not lock it, I will lock it later


```cpp
std::unique_lock<std::mutex> lock(mtx, std::defer_lock);
// do processing
lock.lock(); // can do this because of deferred locking
// do processing
lock.unlock(); // but this can be omitted
```

### `shared_lock`

This lock:
- Is a wrapper over `shared_mutex::lock_shared()`
- Allows multiple threads to hold the lock simultaneously for reading, while writers get exclusive access.
- Works only with shared_mutex

see shared mutex below for example of this lock

### `scoped_lock`

First introduced in C++17 `scoped_lock` aims to solve the problem of deadlock when locking multiple mutexes. 

Just like all other lock methods in this section this is a wrapper over  std::lock() which accepts multiple mutexes.

Consider the following scenario of 2 threads running side-by-side

```cpp
// Thread 1
m1.lock();
m2.lock();

// Thread 2
m2.lock();
m1.lock();
```

If they run together then by the time t2 requests a lock on m1, it is not already locked by T1 hence its allowed, this creates a clear dead lock

```cpp
std::scoped_lock lock(m1, m2); // throws if locking fails
```
### Types of Mutexes 

#### `std::mutex`

The most basic form of *mutex* can be locked once and unlocked, cannot be locked recursively. A recursive locking using this mutex results in a deadlock.

```cpp
mutex m;

m.lock();
// do processing
m.unlock();
```

#### `std::shared_mutex`

This kind of mutex is useful when you have a scenario with *multiple readers* and a *single writer*. 

Reading is always thread safe given that there is not someone else modifying the data!

You can use the normal `std::mutex` for this job as well, but that makes reads sequential and unnecessary wait times.

```cpp
shared_mutex sm;

vector<int> v {1,2,3,4};

void read() {
	shared_lock lock(m); //non deferred so auto calls lock
	cout << v.back();
}

void modify() {
	unique_lock lock(m);
	v.push_back(v.back() + 1);
}
```

### `std::recursive_mutex`

This mutex allows locking itself over and over. Well I cannot think of an example of a good design where this is useful, many C++ experts believe that this is a code smell and indicates that your inner layers are "leaky".

This is mainly used for legacy APIs where if you call a client in the method and the client responds with another call which eventually reaches the same function to do something else.

```cpp
std::recursive_mutex rm;

void inner() {
    std::lock_guard<std::recursive_mutex> lock(rm);
    // do something
}

void outer() {
    std::lock_guard<std::recursive_mutex> lock(rm);
    inner(); // locks rm again on the same thread
}
```

### Timed Mutexes
For the *normal* and *recursive* mutexes there exist timed versions as well, where you can pass time till which the lock will try locking and fail if it cannot acquire the lock before that time.

```cpp
#include <iostream>
#include <mutex>
#include <thread>
#include <chrono>

std::timed_mutex m;

void worker(int id) {
    std::unique_lock<std::timed_mutex> lock(
        m,
        std::defer_lock
    );

    if (lock.try_lock_for(std::chrono::milliseconds(500))) {
        std::cout << "Thread " << id << " got the lock\n";

        std::this_thread::sleep_for(std::chrono::seconds(1));

        // auto unlocks when lock goes out of scope
    } else {
        std::cout << "Thread " << id << " could not get lock in time\n";
    }
}

int main() {
    std::thread t1(worker, 1);
    std::thread t2(worker, 2);

    t1.join();
    t2.join();
}
```

## Condition Variables

Its a synchronization primitive:

A condition variable does the following:
- Acquire a lock
- Check of the condition is true
- If not release the lock (*During this stage the thread is parked/blocked/sleeping by the OS*)
- Wait for a notification that the condition has been met
- Reacquire the lock and execute

**What do we mean by wait for a notification?**
A condition variable in on itself cannot check for the condition to be true, for that it would have to poll something which is the thing that we are trying to avoid, instead there's `notify_*` methods on it which could be called by the consumers when the condition changes.

There is `notify_one` and `notify_all`, notify_one wakes one waiting thread, notify_all wakes all waiting threads.

| Method       | Use for                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `notify_one` | producer-consumer queue<br>thread pool task queue<br>one resource became available                    |
| `notify_all` | shutdown signal<br>configuration/state changed<br>barrier-style logic<br>many threads may now proceed |

```cpp
#include <chrono>
#include <condition_variable>
#include <cstdlib>
#include <format>
#include <queue>
#include<iostream>
#include <mutex>
#include<thread>

class BlockingQueue {
public:
	std::queue<int> q;
	std::mutex m;
	std::condition_variable cv;

	void push(int x) {
		std::unique_lock<std::mutex> lock(m);
		q.push(x);
		std::cout << std::format("data pushed: {}\n", q.front());
		cv.notify_one();
	}

	void pop() {
		std::unique_lock<std::mutex> lock(m);

		cv.wait(lock, [&]{
			return !q.empty();
		});

		q.pop(); // this should wait for data to come if there is no data
		
		std::cout << "data popped";
	}
};

void pushRandomWithWait(BlockingQueue& bq) {
	std::this_thread::sleep_for(std::chrono::seconds(20));
	bq.push(rand() % 1000);
}

int main() {
	BlockingQueue bq;

	std::thread t1([&]{bq.pop();});
	
	std::thread t2(pushRandomWithWait, std::ref(bq));

	t1.join();
	t2.join();

	return 0;
}
```

## Promise and Future

Getting data out of a thread used to be notoriously difficult but with `std::promise` and `std::future` it became much easier. Initially you would have to setup a mutex and a condition variable then notify the condition variable to get the data.

Also if a secondary thread crashes or throws, the program calls `std::terminate` and just crashes. Promise allows you to catch the exception in a worker thread and ship it over to the calling thread.

```cpp
#include <iostream>
#include <thread>
#include <future>
#include <stdexcept>

void workerTask(std::promise<int> p) {
    try {
        // Simulating a logic failure
        throw std::runtime_error("Something went wrong in the background!");
        
        p.set_value(100); // This will never be reached
    } catch (...) {
        // Captures the exception currently being handled and stores it in the promise
        p.set_exception(std::current_exception());
    }
}

int main() {
    std::promise<int> p;
    std::future<int> f = p.get_future();

    std::thread t(workerTask, std::move(p));

    try {
        // This blocks until set_value() or set_exception() is called
        int result = f.get(); 
        std::cout << "Result: " << result << std::endl;
    } catch (const std::exception& e) {
        // The exception thrown in the worker is RE-THROWN here!
        std::cerr << "Caught in main: " << e.what() << std::endl;
    }

    t.join();
    return 0;
}
```

## `std::async`

`std::async` is a high-level wrapper designed to solve one specific problem: **Reducing the boilerplate and complexity of running a task and getting a result.**

Nobody likes writing threads, promises, and futures boilerplate, normally you would:
1. Create a promise
2. Get the future from the promise
3. Create a thread and pass the promise to it (moving it into the worker)
4. Wait on the future and retrieve the result (e.g., call `f.get()`).
5. Manually join or detach the thread

With `std::thread` you are explicitly telling the OS: "Give me a new thread", this is a expensive and can lead to over subscription (too many threads on the CPU)

`std::async` shifts the focus from threads to tasks. You tell the C++ runtime: *Here is a piece of work* and the runtime decides how to run it based on a **Launch Policy**

 The two main launch policies are `std::launch::async` (run the task on a new thread) and `std::launch::deferred` (run it lazily when you call `future::get()`/`wait()`). Default behavior is the system chooses either `std::launch::async` or `std::launch::deferred`, if low on resources it might defer, if the CPU is free, it spawns a thread.

```cpp
// replace all this
std::promise<int> p;
auto f = p.get_future();
std::thread t([&](std::promise<int> p_in) {
    p_in.set_value(calculate());
}, std::move(p));

int result = f.get();
t.join();

// with this
auto f2 = std::async(std::launch::async, [] { return calculate(); });
int result2 = f2.get();
```

### Atomic

`atomic<T>` allows you to safely perform atomic operations on shared data across threads without data races, T can only be trivially copyable. 

Atomic operations here mean that they are automatically thread safe for reads and writes, they internally maintain synchronization mechanisms to prevent concurrency issues.