const utils = require('./util.js');
const winston = require('winston');
const moment = require('moment');
const REQUEST_INTERVAL=3;


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
    let res = null
    try {
        res = await utils.getTask();
    } catch(e) {
        console.log('Error getting task',e);
    }

    task = await JSON.parse(res);
    const calculation = await utils.evaluate(task);

    const { statusCode, body } = await utils.submitTask({"id":task.id, "result": calculation});
    console.log(`Status -> ${statusCode}: ${body}`);
    logger.info(
        `Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100)/100} MB\n, 
        Time: ${moment.now()}`
    );
}

console.info(`Start evaluating, interval: ${REQUEST_INTERVAL} s...\n\n`);
setInterval(main, REQUEST_INTERVAL*1000);
