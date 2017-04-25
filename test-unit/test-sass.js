'use strict'

var config = {
    tasks: {
        sass: {
            browsers: ['last 2 versions']
        }
    }
};

const assert = require('assert');
const fromString = require('./helpers/pipe');
const chai = require('chai');
const expect = chai.expect;
const gulp = require('gulp');
const util = require('gulp-util');

util.env.boilerplate = {
    config
};

chai.use(require('chai-fs'));

const sassPipe = require('../pipe/sass');

describe('gulp sass', function() {
    describe('compiled sass', function() {
        it('generates correct css output, generates sourcemaps', function(done) {
            var input = '$color: red; body { background: $color; }'
            fromString(input, 'sass/style.scss', sassPipe).then(output => {
                var result = output.contents.toString()
                var fs = require('fs')
                fs.writeFile('test.css', result, function() {
                    expect(result).to.equal('body {\n  background: red; }\n\n/*# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQixFQUFFIiwiZmlsZSI6InNhc3Mvc3R5bGUuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gIGJhY2tncm91bmQ6IHJlZDsgfVxuIl19 */\n')
                    fs.unlink('test.css', function() {
                        done();
                    });
                });
            });
        });
            
        it('adds prefixes', function(done) {
            var input = 'body { appearance: button; }'
            fromString(input, 'sass/style.scss', sassPipe).then(output => {
                var result = output.contents.toString()
                var fs = require('fs')
                fs.writeFile('test.css', result, function() {
                    expect(result).to.equal('body {\n  -webkit-appearance: button;\n     -moz-appearance: button;\n          appearance: button; }\n\n/*# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDJCQUFtQjtLQUFuQix3QkFBbUI7VUFBbkIsbUJBQW1CLEVBQUUiLCJmaWxlIjoic2Fzcy9zdHlsZS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcbiAgYXBwZWFyYW5jZTogYnV0dG9uOyB9XG4iXX0= */\n')
                    fs.unlink('test.css', function() {
                        done();
                    });
                });
            });
        });

        it('minifies and remove sourcemaps in production mod', function(done) {
            var input = 'body { appearance: button; }'
            util.env.production = true
            fromString(input, 'sass/style.scss', sassPipe).then(output => {
                var result = output.contents.toString()
                var fs = require('fs')
                fs.writeFile('test.css', function() {
                    expect(result).to.equal('body{-webkit-appearance:button;-moz-appearance:button;appearance:button}')
                    fs.unlink('test.css', function() {
                        done();
                    });
                });
            });
        });
    });
});
