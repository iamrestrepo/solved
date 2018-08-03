// const _ = require("lodash");
const colors = require("colors");
const finalAnswer = require("./stackOverflowAnswer"); 


// return a nice solution to Error from stackOverflow
exports.solution = function (finalAnswer) {
    if (finalAnswer) {
            return colors.white(`MOST VOTED ANSWER FOR THIS ERROR ON STACK OVERFLOW : ${finalAnswer}`);
    }
    else {
        return colors.yellow(`THERE IS NO RECORD OF THIS SPECIFIC ERROR ON STACKOVERFLOW`);
    }
}
