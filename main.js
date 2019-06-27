const fs = require('fs');

//Using this because I'm tired of arguing with my company's proxy
const request = require('request');
const moment = require('moment');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const allOperations = {
    "division": "/",
    "multiplication": "*",
    "addition": "+",
    "subtraction": "-",
    "remainder": "%"
}

let mode = "PROD";
if(process.argv[2] === "training" || process.argv[2] === "t") {
    mode = "TRAIN";
} else if(process.argv[2] === "oneshot" || process.argv[2] === "o") {
    mode = "ONESHOT"
}

//This MUST be changed for non
let getTaskEndpoint = {
    url: "https://interview.adpeai.com/api/v1/get-task",
    proxy: "http://swgscan.wakefern.com:8080"
};

let submitTaskEndpoint = {
    url: "https://interview.adpeai.com/api/v1/submit-task",
    proxy: "http://swgscan.wakefern.com:8080"
}

//things which could fail, failure to get a response?
const getTask = () => new Promise((resolve,reject) => {
    request(getTaskEndpoint, (err, res, body) => {
        if(err) {
            console.log(`Error getting new task ${err}`);
            reject(err)
        }
        resolve(body);
    });
});

//Since an incorrect answer is a 400, if the answer is wrong this should just reject it
//taskResponse must be in following form: 
const submitTask = (taskResponse) => new Promise((resolve,reject)=> {
    request.post({url:submitTaskEndpoint.url, proxy: submitTaskEndpoint.proxy, body:taskResponse, json: true}, (err, res, body) => {
        if(err) {
            console.log('Submit task failed', err);
            console.log(`Body ${body} and response ${res}`)
            reject(err); //so that Training mode can pause instead of failing
        }
        resolve(true);
    })
});

const evaluate = (left,operation,right) => eval(`${left}${operation}${right}`); 

//I'm wondering if this will trip up over itself as the filesize gets bigger....
const recordTask = (taskNo,task,result,success,operation,operationKeyword) => new Promise((resolve, reject) => {
    fs.readFile('allTasksDone.json', (err,data) => {
        if(err) {
            console.log(`Error reading file ${err}`);
            reject(false);
        }

        let allTasks = JSON.parse(data);

        allTasks.tasks.push({
            "id": taskNo,
            "timestamp": moment.now(),
            "task": task,
            "result": result,
            "success": success
        })

        //if the training was a success, and not in the operations dictionary already
        if(success && !(operationKeyword in allTasks.operations)) {
            allTasks.operations[operationKeyword] = operation;
        }

        fs.writeFile(`allTasksDone.json`, JSON.stringify(allTasks), (err) => {
            if(err) {
                console.log(`Error getting task id ${err}`);
                reject(false);
            }
            resolve(true)
        })
    
    })
})

function getLastTaskId() {
    fs.readFile('allTasksDone.json', (err, data) => {
        if(err) {
            console.log(`Error getting task id ${err}`);
            return -1;
        }
        let allTasks = JSON.parse(data);
        return allTasks.tasks.length;
    });
}

function main(mode) {
    let currentTaskId = getLastTaskId();

    if(mode === "PROD"){
        //run the task runner every minute until interrupt/prescribed time
        getTask()
        .then(res => {
            let newTask = JSON.parse(res);
            if(!(res.operation in allOperations)) {
                console.log(`Operation ${res.operation} is not found`)
                process.exit()
            }
            const answer = evaluate(res.left,res.operation,res.right);
            submitTask(JSON.parse(`{ "id": "${res.id}", "response": ${answer} }`))
                .then(subRes => {
                    recordTask(res.id,testOperation,answer,true,testOperation,res.operation)
                        .then(recRes => {
                            console.log("Record complete");
                        })
                        .finally()
                })
                .finally()
        })
        .finally(res => {
            return null
        })
    } else if(mode === "TRAIN") {
        //Training Mode
        console.log("Start Training")
        let answer;
        let testOperation;
        getTask()
        .then(res => {
            let newOperation = JSON.parse(res);

            readline.question(`Current Operation is ${newOperation.operation}, left ${newOperation.left} and right ${newOperation.right}. What do you want to try?`, (userResponse) => {
                testOperation = userResponse;
                readline.close();
            });
            
            answer = eval(`${newOperation.left} ${testOperation} ${newOperation.right}`);
            console.log(`Test answer ${answer}`);

            submitTask(JSON.parse(`{ "id": "${newOperation.id}", "response": ${answer} }`))
            .then(res => {
                recordTask(newOperation.id,testOperation,answer,true,testOperation,newOperation.operation)
                .then(res => {
                    console.log("Success");
                })
                .catch(res => {
                    console.log(`recordTask error: ${res}`);
                })
                console.log("Success");
            })
            .catch(error => {
                recordTask(newOperation.id,testOperation,answer,false,testOperation,newOperation.operation)
                .then(res => {
                    console.log("Failure");
                })
                .catch(res => {
                    console.log(`recordTask error: ${res}`);
                })
            })
        })
        .catch(error => {
            console.log(`getTask error: ${error}`);
        })
        .finally(() => {
            process.exit();
        });

    } else if(mode === "ONESHOT") {
        //This is purely for initial debugging and should not be used except when actively adding features
        console.log("OneShot")
        getTask()
        .then(res => {
            let newOperation = JSON.parse(res);
            console.log(`New operation, ${newOperation.id}, ${newOperation.operation}, left ${newOperation.left}, right ${newOperation.right}`);
            submitTask(JSON.parse(`{ "id": "${newOperation.id}", "response": ${42} }`))
            .then(res => {
                if(res) {
                    console.log("Success");
                }
            })
            .catch(error => {
                console.log("This is bad");
            })
        })
        .catch(error => {
            console.log(`Get error ${error}`);
        })
        .finally(() => {
            process.exit();
        });

    }

}

main(mode);

    //needs to be rate limited, say one request per minute?
    //runs the operation in 'operation' with 'left' and 'right' fields, need operation dictionary for autorun
    
    //have a prototyping interface which lets you guess at the 'operation' manually, if an error occurs
    //what Training mode does is it displays what the operation request was, has you input a possibility,
    //tries that response and if it fails, then lets you retry. When it succeeds, then it's recorded.
