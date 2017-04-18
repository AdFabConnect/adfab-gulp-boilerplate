'use strict';

const vs = require('vinyl-string');
const map = require('map-stream'); // Lets us write in-line functions in our pipe

module.exports = function (input, path, lazypipe) {
    return new Promise((res, rej) => {
        let resultContent = false; // So we can grab the content later

        const vFile = vs(input, { path }); // Equivalent to path: path. ES6 Object Literal Shorthand Syntax

        vFile
        .pipe(lazypipe()) // Call the function we're going to pass in
        .pipe(map((file, cb) => {
            resultContent = file;
            cb(null, file);
        }))
        .on('error', e => {
            rej(e);
        })
        .on('end', () => {
            res(resultContent);
        });
    });
};