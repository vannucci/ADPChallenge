const Element = function(value,priority) {
    this.value = value;
    this.priority = priority;
}

const PriorityQueue = function() {
    this.items = [];
}

//What do you do for same priority?
//What are your fallback criteria? THIS WOULD DEPEND ON THE INPUTTED DATA STRUCTURE
PriorityQueue.prototype.enqueue = function(value, priority) {
    //create a new element, with NEW binding
    let newElement = new Element(value, priority);

    let contains = false;

    for(let i = 0; i < this.items.length; i++) {
        if(this.items[i].priority > newElement.priority && !contains) {
            this.items.splice(i, 0, newElement);
            contains = true;
            break;
        }
    }

    if(!contains) {
        this.items.push(newElement);
    }
}

PriorityQueue.prototype.dequeue = function() {
    if(this.items.length === 0) {
        return null;
    }
    return this.items.shift();
}

PriorityQueue.prototype.printQueue = function() {
    for(let i = 0; i < this.items.length; i++) {
        console.log(this.items[i]);
    }
    console.log('length: ' + this.items.length);
}

PriorityQueue.prototype.isEmpty = function() {
    if(this.items.length === 0) {
        return true;
    }
    return false;
}

//this is NEW Binding
let newQueue = new PriorityQueue();

newQueue.enqueue("this",1);
newQueue.enqueue("is", 2);
newQueue.enqueue("not", 2);
newQueue.enqueue("cool",3);

//Test for same priority, devise method to guarantee an order
//If they have the same priority, go to fallback condition
//IF there's no clear condition, then it's FIFO

newQueue.printQueue();

while(!newQueue.isEmpty()) {
    console.log(newQueue.dequeue().value);
}