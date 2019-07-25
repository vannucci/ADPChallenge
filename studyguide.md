# Topics to Ask Myself and Study

1. Explain how async/await works and use it in an example
1. What are prototypes? How are they different from OO programming? What are the advantages/disadvantages of prototypes?
1. Give examples of using prototypes to define a new object. 
1. What are generators? How would you write one? How would you implement one?
1. What is BFS?
1. Can you implement a linked list? Can you search for an item in a singly-linked list?
1. What is DFS?
1. Can you implement a merge sort?
1. What is a persistence layer?
1. "Take an unordered array of integers, put all the evens first and in order and then the odds in order in one array", using a double-pointer
1. "Given an array of numbers and a selected number, return true if any two numbers in the array add up to the selected number. Be efficient as possible."
    1. Create boolean hashmap. For every element in array, set hashmap[element] = true for every element in array, if hashmap[selected_number - element] == true, return true. return false. O(n)
1. Can you implement a hashmap or simple hash function?
1. Node specific questions: https://www.reddit.com/r/node/comments/aeg71l/nodejs_interview_questions/
1. Explain how the event loop works?
1. What is the difference between equals and strictEquals?
1. Explain how promises work under the hood.

## Things To Do
1. Write a simple express API which has a POST endpoint of "Instruction Number". Then set up a generator or async/await call which passes the instruction number and then calls for them on yield. See what order the endpoint actually gets them in.

## Things I know So Far

1. Async/await basically works by creating a state machine where the different 'await' portions are their own state, and the transitions occur on function.yield(). This is also the way generators work, by initializing a set of states and then transitioning on yield and producing the results. My open question is, do these generators try and pre-complete this data, or are these states only executed when they're transitioned to?
1. Prototypes are a way of creating methods that are common to different instances of an object and its children. So if the type Object has a method toDo(), then all the instances of Object refer to the main implementation of toDo(), and all the children have a 'prototype chain' to search for the method toDo() when they call it. This means that in memory there is only one instance of toDo() and all the objects that have it on their prototype chain refer to it. The bad news is, without any compile-time, if the implementation of toDo() changes enough it can break the behavior of children objects.
1. Assert is a module to make statements that a predicate is true at a given point in code. This can be used for readability, compilation, or error detection. Assert equals/deepEquals in particular have been deprecated, and strictEquals and strictDeepEquals have been used and obey the Same Value Comparison test criteria.
    1. Assert is at the core of how things work, Node uses assertions to do things like establish for [[Promise]] states. You use Assert to establish invariant conditions for an algorithm.
1. Binary Search Trees, add/remove/BFS/DFS
1. Priority queue, be prepared to answer questions about secondary conditions for tasks which have the same priority (default, FIFO, but possible secondary conditions may apply depending on structure)
1. Generators are also