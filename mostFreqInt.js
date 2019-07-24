const assert = require('assert');

const mostFreqInt = function(list) {
    let freq = [];
    for(let i = 0; i < list.length; i++) {
        if(!freq[list[i]]) {
            freq[list[i]] = 1;
        } else {
            freq[list[i]]++;
        }
    }
    //if any element in the array is undefined, MAX won't work
    for(let i = 0; i < freq.length; i++) {
        if(typeof freq[i] !== "number") {
            freq[i] = 0;
        }
    }
    //This or apply BECAUSE Math.max does not work on arrays
    //https://stackoverflow.com/questions/21255138/how-does-the-math-max-apply-work
    return indexOfMax(freq);
}

function indexOfMax(arr) {
    if(arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex
}

let test = [1,2,3,4,4];
console.log(mostFreqInt(test));
assert.strictEqual(mostFreqInt(test),4,"mostFreqInt should produce 4");