var config      = require('../gulp-config');
var assert = require('assert');

var chai = require('chai');
chai.use(require('chai-fs'));

var expect = chai.expect;

setTimeout(function() {
    describe('gulp less', function() {
        describe('compiled less', function() {
          it('css folder ' + config.destinationRoot + config.tasks.less.destination + ' should contain style-less.css file', function() {
              var lessFolderErrorMessage = config.destinationRoot + config.tasks.less.destination + ' folder does not exists';
              expect(config.destinationRoot + config.tasks.less.destination).to.be.a.directory(lessFolderErrorMessage).and.include.contents(['style-less.css'])
          });
        });
    });
}, 0);