const _ = require("lodash");
const colors = require("colors");

const tempSolution = 'To solve this problem...'

// return a solution to Error from stackOverflow
exports.solution = function (solution) {
    if (solution) {
            return colors.white(`MOST VOTED ANSWER FOR THIS ERROR ON STACK OVERFLOW : ${solution}`);
    }
    else {
        return colors.yellow(`THERE IS NO RECORD OF THIS SPECIFIC ERROR ON STACKOVERFLOW`);
    }
}
