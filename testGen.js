function respond(instr) {
    console.log(`pretimeout instr: ${instr}`);
    setTimeout(() => {
        console.log(`instr: ${instr}`);
        return;
    }, 2000);   
}

function *gen() {
    console.log(`Call: ${1}`);
    yield respond(1);
    console.log(`Call: ${2}`);
    yield respond(2);
    console.log(`Call: ${3}`);
    yield respond(3);
    console.log(`Call: ${4}`);
    yield respond(4);
}

let iter = gen()

iter.next()

// for(let i = 1; i < 5; i++) {
//     iter.next();
// }

new Promise((resolve, reject) => {
    console.log('eeeeager');
    resolve();
  })