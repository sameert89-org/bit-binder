A stack is a LIFO data structure (Last in first out). It means the element that is added last is taken out first, like a stack of plates at a wedding buffet.

Below is the implementation of a stack in C
```c
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
struct stack {
	int size, top;
	int *base;
};
struct stack *new_stack(int n){
	struct stack* st = malloc(sizeof(struct stack));
	st->size = n;
	st->top = -1;
	st->base = malloc(sizeof(int) * n);
	memset(st->base, 0, n*sizeof(int));
    return st;
}
int top(struct stack *st){
	if(st->top == -1){
		printf("%s", "Underflow");
		return -1;
	} else if(st->top == st->size) {
		printf("%s", "Overflow");
        return -1;
	}
	 else {
		return st->base[st->top];
	}
}
int pop(struct stack *st){
	if(st->top == -1){
		printf("%s", "Underflow");
		return -1;
	} else {
		int top_val = st->base[st->top];
		st->top--;
		return top_val;
	}
}
void push (struct stack *st, int val) {
	if (st->top == st->size) {
		printf("%s", "Overflow");
	} else {
		st->top++;
		st->base[st->top] = val;
	}
}
int main(){
	int n = 10;
	struct stack *st = new_stack(n);
	top(st);
	push(st, 55);
	printf("%d", top(st));
	printf("%d", pop(st));
	top(st);
}

```