//Binary tree

const Node = function(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

const BinaryTree = function() {
    this.root = null;
}

//things to implement:
//add a node
//remove a node
//find the largest node on a side (for removing root)
//search for node BFS and DFS

BinaryTree.prototype.add = function(value) {
    
    let newNode = new Node(value);

    if(!this.root) {
        this.root = newNode;
        return;
    }

    let currentNode = this.root;

    while(currentNode) {
        if(newNode.value < currentNode.value) {
            if(!currentNode.left) {
                currentNode.left = newNode;
                break;
            } else {
                currentNode = currentNode.left;
            }
        } else {
            if(!currentNode.right) {
                currentNode.right = newNode;
                break;
            } else {
                currentNode = currentNode.right;
            }
        }
    }

}

BinaryTree.prototype.printDFS = function(node) {
    if(node) {
        console.log(`Value: ${node.value}`);
        this.printDFS(node.left);
        this.printDFS(node.right);
    }
}

BinaryTree.prototype.printBFS = function() {
    //keep track of level
    let queue = [this.root];

    while(queue.length !== 0) {
        for(let i = 0; i < queue.length; i++) {
            let node = queue.shift();

            console.log(`Value: ${node.value}`);
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right)
            }
        }
    }
}

BinaryTree.prototype.getNode = function(node) {
    if(node === null) {
        return;
    }
    return [node.value,this.getNode(node.left),this.getNode(node.right)];
}

BinaryTree.prototype.removeNode = function(data) {
    
}


let treeOLife = new BinaryTree();

treeOLife.add(5);
treeOLife.add(4);
treeOLife.add(6);
treeOLife.add(1);
treeOLife.add(7);
treeOLife.add(3);

treeOLife.printDFS(treeOLife.root);
console.log('=======\n')
treeOLife.printBFS()