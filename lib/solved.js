const colors = require("colors");
const request = require("request")
const https = require('https')
const http = require('http');
const iconv = require("iconv-lite")
const zlib = require("zlib")


// catch error

exports.errorCatcher = (processCall) => processCall.stderr.on('data', (data) => {

    //stderr.data

    const dataFinal = data;
    console.log(colors.red('DETECTED ERROR: '))

    //trimming to get error type

    const errorToLookUp = dataFinal.toString().split('Error:')[1].split('\n')[0];
    console.log(colors.yellow(errorToLookUp));
    console.log(colors.white(`StackOverflow's most voted answer to this error : `));

    const url = 'https://api.stackexchange.com/2.2/info?site=stackoverflow';

    const callback = (something) => {
        console.log(something)
        return something;
    }

    //getting gZip
    const getGzipped = (callback) => {
        // buffer to store the streamed decompression
        const buffer = [];

        https
          .get(
            'https://api.stackexchange.com/2.2/answers?page=1&pagesize=2&fromdate=1533340800&todate=1533427200&order=desc&min=1&max=3&sort=votes&site=stackoverflow',
            function(res) {
              // pipe the response into the gunzip to decompress
              let gunzip = zlib.createGunzip();
              console.log('got the file zipped!!!');
              res.pipe(gunzip);

              gunzip
                .on('data', function(data) {
                  // decompression chunk ready, add it to the buffer
                  console.log(
                    colors.rainbow('we got data !!!!!>>>>>>>>>>>'),
                    data
                  );
                  buffer.push(data.toString());
                })
                .on('end', function() {
                  // response and decompression complete, join the buffer and return
                  console.log(
                    colors.rainbow(
                      'response and decompression complete wohoooooo',
                      '>>>>>>>'
                    ),
                    buffer
                  );
                  console.log(buffer.join(''));
                })
                .on('error', function(e) {
                  console.log(e);
                });
            }
          )
          .on('error', function(e) {
            console.log('error with the http request!!!');
            console.log(e);
          });
    }
    getGzipped()
});









//fetch error to stackOverflow
// request.get(
//   {
//     encoding: null,
//     method: 'GET',
//     uri:
//       'https://api.stackexchange.com/2.2/info?site=stackoverflow',,

//   },
//   function(error, response, body) {
//     const utf8String = iconv.decode(new Buffer(body), 'utf16');
//     console.log('response', response.statusCode);
//     console.log('body =>>>>>>>', utf8String);
//     console.log('error', error);
//   }