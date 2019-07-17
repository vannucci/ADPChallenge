const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-json'))
var task = null;

describe('GetTask', function() {
    var util = require('../util');
    it('should get a new task', function() {
        return util.getTask()
        .then(res => {
            task = res;
            expect(res).to.not.be.null;
            expect(res).to.not.a.jsonFile();
        })
    })
});

describe('Evaluate', () => {
    var util = require('../util')
    let result = null;
    it('should evaluate a task', () => {
        let additionTask = {
            id:"57cd8daa-7feb-4877-a0cc-d81ead85f060",
            operation:"addition",
            left:5503371728089849,
            right:2285523657884601
        }
        let divisionTask = {
            "id":"290a30fc-662e-4137-9026-3a6e38f847df",
            "operation":"division",
            "left":5966823694840305,
            "right":-7488245207314899
        }

        result = util.evaluate(additionTask);
        expect(result).to.equal(7788895385974450);
        result = util.evaluate(divisionTask);
        expect(result).to.equal(-0.79682536156957146107877227216415800394980025240968472606);
        result = util.evaluate(JSON.parse(task));
        expect(result).to.not.be.null;


    })
})