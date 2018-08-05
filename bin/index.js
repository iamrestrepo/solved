#!/usr/env node

'use strict'

const { spawn } = require('child_process');
const answer = require("../lib/solved.js");


const processCall = spawn('node', ['bin/errorGenerator.js'], { cwd: './' });


// markup of process' exit
process.on('exit', (code, signal) => {
    console.log('Process exited with ' +
        `code ${code} and signal ${signal}`);
});


answer.errorCatcher(processCall);