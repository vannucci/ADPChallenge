//sort the list?


const Node = function(value) {
    this.value = value;
    this.next = null;
}

const LinkedList = function() {
    this.head = null;
}

LinkedList.prototype.add = function(value) {
    //init a new node
    let newNode = new Node(value);

    if(this.head === null) {
        this.head = newNode;
        return;
    }

    newNode.next = this.head;
    this.head = newNode;
    return;
};

LinkedList.prototype.printList = function() {
    let currentNode = this.head;
    let allNodes = [];

    if(this.head === null) {
        console.log('List is empty');
    }

    while(currentNode) {
        allNodes.push(currentNode.value);
        currentNode = currentNode.next;
    }

    console.log(`HEAD -> ${allNodes} -> NULL`);
}

LinkedList.prototype.delete = function(value) {
    let currentNode = this.head;
    let lastNode = null;

    while(currentNode) {
        if(currentNode.value === value) {
            if(lastNode === null) { //in the case of the element being the first node
                this.head = currentNode.next;
            } else { //all other cases
                lastNode.next = currentNode ? currentNode.next : null;
            }
            currentNode.next = null;
            return true;
        }
        lastNode = currentNode;
        currentNode = currentNode.next;
    }

    return false;

}

LinkedList.prototype.findMiddle = function() {
    let fastptr = this.head;
    let slowptr = this.head;
    if(!this.head) {
        return null;
    }
    while(fastptr) {
        fastptr = fastptr.next;
        if(fastptr) {
            fastptr = fastptr.next;
            slowptr = slowptr.next;
        }
    }
    return slowptr;
}

LinkedList.prototype.mergeSort = function(list) {
    if(list.next === null){
        return list;
    }

    let count = 0;
    let countList = list;
    let leftPart = list;
    let leftPointer = list;
    let rightPart = null;
    let rightPointer = null;


    while(countList.next !== null) {
        count++;
        countList = countList.next;
    }
}

let list = new LinkedList();

list.add(1);
list.add(5);
list.add(10);
list.add(111);
list.add(14);
list.add(99);
list.add(15);

list.printList();

console.log(list.findMiddle());