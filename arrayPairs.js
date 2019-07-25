//Find pairs in an integer array whose sum is equal to 10 (bonus: do it in linear time)

const assert = require('assert');

const findPairs = function(arr) {
    //create a hash for every element in array
    hashtable = {};
    arr.forEach(e => {
        hashtable[e] = true;
    });
    arr.forEach(e => {
        console.log(e);
        if(false) {
            return true;
        }
    })
    return false;
    
}

//isPair function, takes two numbers and returns true or false


test = [1,9,0,3,5]
findPairs(test);
assert.strictEqual(findPairs(test),[[1,9]], "findPairs should fine 1 and 9 as a pair which sum to 10")