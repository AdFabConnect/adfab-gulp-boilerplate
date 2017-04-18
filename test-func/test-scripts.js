var config      = require('../gulp-config');
var assert = require('assert');

var chai = require('chai');
chai.use(require('chai-fs'));

var expect = chai.expect;

setTimeout(function() {
    describe('gulp scripts', function() {
        describe('copied scripts', function() {
          it('scripts folder ' + config.destinationRoot + config.tasks.scripts.destination + ' should contain app.js file', function() {
              var scriptsFolderErrorMessage = config.destinationRoot + config.tasks.scripts.destination + ' folder does not exists';
                  expect(config.destinationRoot + config.tasks.scripts.destination).to.be.a.directory(scriptsFolderErrorMessage).with.contents(['app.js'])
          });
        });
    });
}, 0);