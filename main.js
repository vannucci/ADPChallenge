require('dotenv').config();
const utils = require('./util.js');

async function main() {
    answer = await utils.getTask().then(res => {
        const task = JSON.parse(res);
        const calculation = utils.evaluate(task);
        console.log(`Task -> ${res}`);
        return({"id":task.id, "result": calculation});
    });
    const { statusCode, body } = await utils.submitTask(answer);
    console.log(`Status -> ${statusCode}: ${body}`);
}

console.log(`Start evaluating, interval: ${process.env.REQUEST_INTERVAL} s...`);
setInterval(main, process.env.REQUEST_INTERVAL*1000);