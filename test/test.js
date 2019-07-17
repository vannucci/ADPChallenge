const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-json'))
let task = null; //task to be tested
let taskResult = null; //result of task operation

describe('Get Task', function() {
    var util = require('../util');
    it('should get a new task', function() {
        return util.getTask()
        .then(res => {
            task = res;
            expect(res).to.not.be.null;
        })
    })
});

describe('Evaluate', () => {
    var util = require('../util')
    let calcResult = null;
    it('should parse the task into JSON object', () => {
        task = JSON.parse(task);
        expect(task).to.be.a.jsonObj();
        expect(task.id).to.be.a('string');
    });
    it('should evaluate the task and produce a response', () => {
        calcResult = util.evaluate(task);
        expect(calcResult).to.not.be.null;
        taskResult = {"id":task.id, "result": calcResult}
    })
});

describe('Submitting Task Solution', () => {
    var util = require('../util')
    it('should submit the answer and respond with status code 200 and body', async () => {
        const { statusCode, body } = await util.submitTask(taskResult)
        expect(statusCode).to.not.be.null;
        expect(statusCode).to.equal(200);
        expect(body).to.not.be.null;

    })
})