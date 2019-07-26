const randArr = function(maxVal,length) {
    let arr = [];

    for(let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random()*maxVal));
    }
    
    return arr;
}

const randPriorityQueue = function(maxPriority,length) {
    let pq = new PriorityQueue();

    for(let i = 0; i < length; i++) {
        pq.addTask("a".repeat(Math.floor(Math.random() * maxPriority)), Math.floor(Math.random() * maxPriority));
    }

    return pq;
}

const Task = function(task,priority) {
    this.task = task;
    this.priority = priority;
}

const PriorityQueue = function(queue = []) {
    this.queue = queue;
}

PriorityQueue.prototype.addTask = function(task,priority) {
    let newTask = new Task(task,priority);

    if(this.queue.length === 0) {
        this.queue.push(newTask);
        return;
    }

    let contains = false;

    let counter = 0;
    while(counter < this.queue.length) {
        if(newTask.priority > this.queue[counter] && !contains) {
            this.queue.splice(counter,0,newTask);
            contains = true
            break;
        }
        counter++;
    }

    if(!contains) {
        this.queue.push(newTask);
    }

}

const mergeSortQueue = function(pqueue) {
    let length = pqueue.queue.length;

    if(length < 2) {
        return pqueue;
    }

    let mid = Math.floor(length / 2);
    let L = new PriorityQueue(pqueue.queue.slice(0,mid));
    let R = new PriorityQueue(pqueue.queue.slice(mid,length));

    return merge(mergeSortQueue(L), mergeSortQueue(R));

}

const merge = function(left,right) {
    let result = new PriorityQueue();
    
    while(left.queue.length && right.queue.length) {
        if(left.queue[0].priority < right.queue[0].priority) {
            result.queue.push(left.queue.shift());
        } else {
            result.queue.push(right.queue.shift());
        }
    }
    result.queue.concat(left.queue).concat(right.queue);
    return result;
}

let count = 15;
let prquOne = new randPriorityQueue(20,count);
let prquTwo = new randPriorityQueue(20,count);

console.log(prquOne);
prquOne = mergeSortQueue(prquOne);
console.log(prquOne);

// let arr = randArr(20,count);
// console.log('\n','init -> ',arr);
// console.log('='.repeat(count*5));
// arr = mergesort(arr);
// console.log('final -> ',arr);
