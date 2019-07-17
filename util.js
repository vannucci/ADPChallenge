const GET_URL="https://interview.adpeai.com/api/v1/get-task";
const POST_URL="https://interview.adpeai.com/api/v1/submit-task";
const PROXY_URL="http://swgscan.wakefern.com:8080";


const request = require('request');

function getTask() {
    return new Promise((resolve, reject) => {
        request({url:GET_URL, proxy:PROXY_URL}, (err, res, body) => {
            if(err) {
                console.error(`Get task failed ${err}`);
                reject(err);
            }
            resolve(body);
        });
    });
}

function submitTask(taskResponse) {
    return new Promise((resolve, reject) => {
        request.post({url:POST_URL, proxy:PROXY_URL, body:taskResponse, json: true}, (err, res, body) => {
            if(err) {
                console.error(`Submit task failed ${err}`);
                reject(err);
            }
            resolve(res);
        })
    }); 
}

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


module.exports = {
    getTask,
    submitTask,
    evaluate
}