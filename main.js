const request = require('request');
require('dotenv').config();

function evaluate(task) {
    switch(task.operation) {
        case "division":
            return (task.left / task.right);
        case "multiplication":
            return (task.left * task.right);
        case "addition":
            return (task.left + task.right);
        case "subtraction":
            return (task.left - task.right);
        case "remainder":
            return (task.left % task.right);
        default:
            return null;
    }
}

function getTask() {
    return new Promise((resolve, reject) => {
        request({url:process.env.GET_URL, proxy:process.env.PROXY}, (err, res, body) => {
            if(err) {
                reject(err);
            }
            resolve(body);
        });
    });
}

function submitTask(taskResponse) {
    return new Promise((resolve, reject) => {
        request.post({url:process.env.POST_URL, proxy: process.env.PROXY, body:taskResponse, json: true}, (err, res, body) => {
            if(err) {
                console.log('Submit task failed', err);
                reject(err);
            }
            resolve(res);
        })
    }); 
}

async function main() {
    answer = await getTask().then(res => {
        let task = JSON.parse(res);
        let calculation = evaluate(task);
        if(calculation) {

        }
        console.log('calculation -> ' + calculation);
        return({"id":task.id, "response": calculation});
    });

    console.log(typeof(answer.response));

    await submitTask(answer).then(res => console.log(`Final answer ${JSON.stringify(res)}`));

}

console.log(`Start evaluating, interval: ${requestInterval}...`);
setInterval(main, process.env.REQUEST_INTERVAL*1000);
