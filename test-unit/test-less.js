'use strict'

var config = {
    tasks: {
        less: {
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
const lessPipe = require('../pipe/less');

describe('gulp less', function() {
    describe('compiled less', function() {
        it('generates correct css output', function(done) {
            var input = '@color: red; body { background: @color; }'
            var result = 'test'
            fromString(input, 'less/style.less', lessPipe).then(output => {
                var result = output.contents.toString()
                var fs = require('fs')
                fs.writeFile('test.css', result, function(err) {
                    expect(result).to.equal('body {\n  background: red;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtDQUNqQiIsImZpbGUiOiJsZXNzL3N0eWxlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xuICBiYWNrZ3JvdW5kOiByZWQ7XG59XG4iXX0= */\n')
                    fs.unlink('test.css', function() {
                        done();
                    });
                })
            });
        });

        it('adds prefixes', function(done) {
            var input = 'body { appearance: button; }'
            fromString(input, 'sass/style.scss', lessPipe).then(output => {
                var result = output.contents.toString()
                var fs = require('fs')
                fs.writeFile('test.css', result, function() {
                    expect(result).to.equal('body {\n  -webkit-appearance: button;\n     -moz-appearance: button;\n          appearance: button;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDJCQUFtQjtLQUFuQix3QkFBbUI7VUFBbkIsbUJBQW1CO0NBQ3BCIiwiZmlsZSI6InNhc3Mvc3R5bGUuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gIGFwcGVhcmFuY2U6IGJ1dHRvbjtcbn1cbiJdfQ== */\n')
                    fs.unlink('test.css', function() {
                        done();
                    });
                });
            });
        });

        it('minifies and remove sourcemaps in production mod', function(done) {
            var input = 'body { appearance: button; }'
            util.env.production = true
            fromString(input, 'sass/style.scss', lessPipe).then(output => {
                var result = output.contents.toString()
                var fs = require('fs')
                fs.writeFile('test.css', result, function() {
                    expect(result).to.equal('body{-webkit-appearance:button;-moz-appearance:button;appearance:button}')
                    fs.unlink('test.css', function() {
                        done();
                    });
                });
            });
        });
    });
});
