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

    let contains = false;

    let counter = 0;
    while(counter < this.queue.length) {
        if(newTask.priority > this.queue[counter].priority && !contains) {
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

const mergeSort = function(arr) {
    let length = arr.length;

    if(length < 2) {
        return arr;
    }

    let mid = Math.floor(length / 2);
    let L = arr.slice(0,mid);
    let R = arr.slice(mid,length);

    return merge(mergeSort(L), mergeSort(R));

}

const merge = function(left,right) {
    let result = [];
    
    while(left.length && right.length) {
        if(left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    

    return result.concat(left).concat(right);;
}

const mergeQueues = function(left,right) {
    let result = new PriorityQueue();
    
    let L = 0;
    let R = 0;

    while(L < left.queue.length && R < right.queue.length) {
        console.log(left.queue[L]);
        result.addTask(left.queue[L].task,left.queue[L].priority);
        L++;
        result.addTask(right.queue[R].task,right.queue[R].priority);
        R++;
    }

    result.queue.concat(left.queue).concat(right.queue);

    return result;
}


let count = 15;
let prquOne = new randPriorityQueue(20,count);
let prquTwo = new randPriorityQueue(20,count);

prquCombo = mergeQueues(prquOne,prquTwo);
console.log(prquCombo);

let arr = randArr(20,count);
console.log('\n','init -> ',arr);
console.log('='.repeat(count*5));
arr = mergeSort(arr);
console.log('final -> ',arr);
