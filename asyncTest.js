const addFunc = function(a,b) {
    return new Promise((resolve,reject) => {
        resolve(a+b);
    }).then(res => res);
}

const subFunc = async function(a,b) {
    return (a-b);
}

const subPromiseFunc = function(a,b) {
    return new Promise((resolve,reject) => {
        resolve(a-b);
    }).then(res => res);
}

const errFunc = async function(a) {
    throw Error("This is an error");
}

async function main() {
    let subAnsFour = null;
    let answer = await addFunc(2,3);
    let subAns = await subFunc(5,1);
    await console.log('add',answer);
    await console.log('sub',subAns);
    let addAns = addFunc(10,10).then((res) => {
        console.log('add',res);
    });
    console.log(addAns);
    let subAns2 = await subFunc(100-3).then(res => {
        console.log('subAns2',res);
    })
    console.log('subAns2',subAns2);
    let subAns3 = await subPromiseFunc(100,3);
    await console.log('subAns3',subAns3);
    subPromiseFunc(55,55).then(res => console.log('subPromiseFunc',res));
    subPromiseFunc(55,55).then(res => console.log('subPromiseFunc',res));
    await subFunc(90,3).then(res => subAnsFour = res);
    console.log('subAnsFour',subAnsFour);
    // try {
    //     await errFunc();
    // } catch(err) {
    //     console.log(err);
    // }
}

const foo = function() {
    let hey = 'hey';
    let ya = '';
    try {
        ya = 'ya';
    } catch(e) {
        return e;
    }
    return { hey, ya };
}

main();

const { hey, ya } = foo();
console.log(hey, ya);