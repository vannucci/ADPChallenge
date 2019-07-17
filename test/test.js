const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-json'))

describe('GetTask', function() {
    var util = require('../util');
    it('should get a new task', function() {
        var task = null;
        return util.getTask()
        .then(res => {
            task = res;
            console.log(JSON.stringify(task));
            expect(res).to.not.be.null;
            expect(res).to.not.a.jsonFile();
        })
    })
});

describe('Evaluate', () => {
    var util = require('../util')
    it('should evaluate a task', () => {
        let addition = {
            id:"57cd8daa-7feb-4877-a0cc-d81ead85f060",
            operation:"addition",
            left:5503371728089849,
            right:2285523657884601
        }
        let division = {
            "id":"290a30fc-662e-4137-9026-3a6e38f847df",
            "operation":"division",
            "left":5966823694840305,
            "right":-7488245207314899
        }

        result = util.evaluate(addition);
        expect(result).to.equal(7788895385974450);
        result = util.evaluate(division);
        expect(result).to.equal(-0.79682536156957146107877227216415800394980025240968472606);


    })
})