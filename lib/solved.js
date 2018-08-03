// const _ = require("lodash");
const colors = require("colors");


// return a nice solution to Error from stackOverflow

exports.solved = function (finalAnswer) {
    if (finalAnswer) {
            return colors.white(`MOST VOTED ANSWER FOR THIS ERROR ON STACK OVERFLOW : ${finalAnswer}`);
    }
    else {
        return colors.yellow(`THERE IS NO RECORD OF THIS SPECIFIC ERROR ON STACKOVERFLOW`);
    }
}

