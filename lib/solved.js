const colors = require("colors");
const request = require("request")
const https = require('https')
const http = require('http');
const iconv = require("iconv-lite")
const zlib = require("zlib")


exports.errorCatcher = (processCall) => processCall.stderr.on('data', (data) => {

    //GET AND PARSE ERROR

    // console.log(process);
    const dataFinal = data;
    console.log(colors.red('DETECTED ERROR: '))
    // console.log(dataFinal.toString());
    let errorToLookUp = dataFinal.toString().split('\n\n')[1].split('\n')[0];
    console.log(colors.yellow(errorToLookUp));
    console.log(colors.white(`StackOverflow's most voted answer to this error : `));


    // FETCH AND GET DATA FROM API

    const getGzipped = (callback) => {

        // buffer to store the streamed decompression
        const buffer = [];
        const searchingParams = {
            tagged: process.argv[1]
                .split('bin')[1]
                .split('.')[1]
        };

        https
            .get(
                `https://api.stackexchange.com/2.2/questions?order=desc&sort=votes&tagged=${searchingParams.tagged}&site=stackoverflow`,
                function (res) {

                    // pipe the response into the gunzip to decompress
                    let gunzip = zlib.createGunzip();
                    res.pipe(gunzip);

                    gunzip
                        .on('data', function (data) {

                            buffer.push(data.toString());
                        })
                        .on('end', function () {
                            // response and decompression complete, join the buffer and return
                            // console.log( buffer );

                            const allQuestions = buffer.join('');
                            const questions = JSON.parse(allQuestions)['items'];
                            for (let question in questions) {
                                console.log(questions[question]['title'])
                            }
                        })
                        .on('error', function (e) {
                            console.log(e);
                        });
                }
            )
            .on('error', function (e) {
                console.log('error with the http request!!!');
                console.log(e);
            });
    }
    getGzipped()
});
