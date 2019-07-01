require('dotenv').config();
const utils = require('./util.js');
const winston = require('winston');
const moment = require('moment');

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
    answer = await utils.getTask().then(res => {
        try {
            const task = JSON.parse(res);
        } catch(err) {
            return new Error("(Res)ponse is not valid JSON");
        }
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

console.info(`Start evaluating, interval: ${process.env.REQUEST_INTERVAL} s...\n\n`);
setInterval(main, process.env.REQUEST_INTERVAL*1000);
