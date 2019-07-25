//Given an array of ints, segregate even and odd integers

const segregate = function(list) {
    let leftPointer = 0;
    let rightPointer = list.length - 1;
    while(leftPointer < rightPointer) {
        console.log(list[leftPointer],list[rightPointer], list);
        if(list[leftPointer] % 2 === 1 && list[rightPointer] % 2 === 0) {
            let temp = list[leftPointer];
            list[leftPointer] = list[rightPointer];
            list[rightPointer] = temp;
        }
        if(list[leftPointer] % 2 === 0) {
            leftPointer++;
        }
        if(list[rightPointer] % 2 === 1) {
            rightPointer--;
        }
    }
    return list;
}

let input = [1,9,5,3,2,6,7,11,4,10,12]

console.log(`Input ${input} and result ${segregate(input)}`);