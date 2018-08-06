const colors = require("colors");
const request = require("request")
const https = require('https')
const http = require('http');
const iconv = require("iconv-lite")
const zlib = require("zlib")



//build queried url

const buildQuestion = (params) => {

    const url = `https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=1&order=desc&sort=votes&q=${params.q}&accepted=True&tagged=javascript&title=${params.title}&site=stackoverflow&filter=withbody`;
    return url
}
// FETCH AND GET DATA FROM API

const getGzipped = (url) => {
    
    // buffer to store the streamed decompression
    const buffer = [];

    https
        .get(
            url,
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
                        const answer = buffer.join('');

                        //get Answer ID to selected question

                        const answerId = JSON.parse(answer).items[0].question_id;
                        // console.log(answer);
                        // console.log(answerId);


                        //get FINAL ANSWER from API

                        const buffer2 = [];

                        https
                            .get(
                            `https://api.stackexchange.com/2.2/answers/${answerId}?order=desc&sort=activity&site=stackoverflow&filter=withbody`,
                                function (res) {
                                    let gunzip2 = zlib.createGunzip();
                                    res.pipe(gunzip2);

                                    gunzip2
                                        .on('data', function (data) {
                                            buffer2.push(data.toString());
                                        })
                                        .on('end', function () {
                                            const answer = buffer.join('');
                                            const finalAnswerForUSer= JSON.parse(answer).items[0].body;
                                            console.log(colors.white(`StackOverflow's most voted answer to this error : `));
                                            console.log(colors.magenta(finalAnswerForUSer));
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
        
        
        exports.errorCatcher = (processCall) => processCall.stderr.on('data', (data) => {
            
            //GET AND PARSE ERROR
            
            // console.log(process);
            const dataFinal = data;
            console.log(dataFinal.toString());
            console.log(colors.red('YOUR ERROR: '))
            let errorToLookUp = dataFinal.toString().split('\n\n')[1].split('\n')[0];
            
            console.log(colors.yellow(errorToLookUp));
            

            const quarifyError = (inputToQuerify) => {
                const query = encodeURI(errorToLookUp);
                return query;
                // console.log('query',query);

            }
            const advancedParams = quarifyError(errorToLookUp);

            const searchParams = { q: advancedParams, title: advancedParams };
            
            // build question with queried params and fetch for answer  
            // console.log(buildQuestion(searchParams));
            
            const finalAnswer = getGzipped(buildQuestion(searchParams));
        });
        


        //GETTING ALL QUESTIONS 

        // all questions => `https://api.stackexchange.com/2.2/questions?order=desc&sort=votes&tagged=${searchingParams.tagged}&site=stackoverflow`;
        // const allQuestions = buffer.join('');
        // const questions = JSON.parse(allQuestions)['items'];
        // for (let question in questions) {
        //     console.log(questions[question]['title'])
        // }








