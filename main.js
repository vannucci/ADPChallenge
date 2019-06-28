require('dotenv').config();
const utils = require('./util.js');

async function main() {
    answer = await utils.getTask().then(res => {
        let task = JSON.parse(res);
        let calculation = utils.evaluate(task);
        if(calculation) {

        }
        console.log('calculation -> ' + calculation);
        return({"id":task.id, "response": calculation});
    });

    console.log(typeof(answer.response));

    await utils.submitTask(answer).then(res => console.log(`Status -> ${res.statusCode}: ${res.body}`));

}

console.log(`Start evaluating, interval: ${process.env.REQUEST_INTERVAL}s...`);
setInterval(main, process.env.REQUEST_INTERVAL*1000);
