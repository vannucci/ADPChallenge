require('dotenv').config();
const utils = require('./util.js');
const winston = require('winston');
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
        const task = JSON.parse(res);
        const calculation = utils.evaluate(task);
        logger.info(`Task -> ${res}`);
        return({"id":task.id, "result": calculation});
    });
    const { statusCode, body } = await utils.submitTask(answer);
    logger.info(`Status -> ${statusCode}: ${body}`);
    logger.info(`Memory used -> ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100)/100} MB\n`);
}

logger.info(`Start evaluating, interval: ${process.env.REQUEST_INTERVAL} s...\n\n`);
setInterval(main, process.env.REQUEST_INTERVAL*1000);
