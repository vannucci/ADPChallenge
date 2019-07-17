const utils = require('./util.js');
const winston = require('winston');
const moment = require('moment');
const REQUEST_INTERVAL=20;


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

async function main() {
    let task = null
    answer = await utils.getTask().then(res => {
        try {
            task = JSON.parse(res);
        } catch(err) {
            return new Error("(Res)ponse is not valid JSON");
        }
        console.log(task);
        const calculation = utils.evaluate(task);
        console.info(`Task -> ${res}`);
        return({"id":task.id, "result": calculation});
    });
    const { statusCode, body } = await utils.submitTask(answer);
    console.log(`Status -> ${statusCode}: ${body}`);
    logger.info(
        `Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100)/100} MB\n, 
        Time: ${moment.now()}`
    );
}

console.info(`Start evaluating, interval: ${REQUEST_INTERVAL} s...\n\n`);
setInterval(main, REQUEST_INTERVAL*1000);
