'use strict';

var config      = require('../gulp-config');
var assert = require('assert');

var chai = require('chai');
chai.use(require('chai-fs'));

var expect = chai.expect;

var gulp = require('gulp');

const vs = require('vinyl-string');
const map = require('map-stream');

const sassPipe = require('../node_modules/adfab-gulp-boilerplate/pipe/sass');

var fromString = (input, path, lazypipe) => {
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
            console.log('error :( !!!!!!!!!');
            rej(e);
        })
        .on('end', () => {
            console.log('ended!!!!!!!!!');
            res(resultContent);
        });
    });
}

var input = '$foo: red; body { background: $foo; }';
fromString(input, 'sass/style.scss', sassPipe).then(output => {
    console.log('yeah!', output);
});

setTimeout(function() {
    console.log('wait!')
}, 5000);

//
////setTimeout(function() {
//    describe('gulp sass', function() {
//        describe('compiled sass', function() {
//          it('css folder ' + config.destinationRoot + config.tasks.sass.destination + ' should contain style-sass.css file', function() {
//              var sassFolderErrorMessage = config.destinationRoot + config.tasks.sass.destination + ' folder does not exists';
//              expect(config.destinationRoot + config.tasks.sass.destination).to.be.a.directory(sassFolderErrorMessage).and.include.contents(['style-sass.css'])
//          });
//        });
//    });
////}, 0);