#!/usr/env node

 'use strict' 

const { spawn } = require('child_process');
const answer = require("../lib/solved.js");
const child = spawn('pwd');


// child.stderr.on('data', (data) => {
//     console.error(`child stderr:\n${data}`);
// });

// child.on('exit', (code, signal) =>  {
//     console.log('child process exited with ' +
//         `code ${code} and signal ${signal}`);
// });


console.log(answer.solved());