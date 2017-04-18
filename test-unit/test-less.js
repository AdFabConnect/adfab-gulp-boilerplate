'use strict';

var config      = require('../gulp-config');
var assert = require('assert');

var fromString = require('./helpers/pipe');
var chai = require('chai');
chai.use(require('chai-fs'));

var expect = chai.expect;

var gulp = require('gulp');

const lessPipe = require('../pipe/less');

describe('gulp less', function() {
    describe('compiled less', function() {
      it('generates correct css output', function() {
          var input = '@color: red; body { background: @color; }';
          var result = 'test';
          return fromString(input, 'less/style.less', lessPipe).then(output => {
              var result = output.contents.toString();
              var fs = require('fs');
              fs.writeFile('test.css', result);
              expect(result).to.equal('body {\n  background: red;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtDQUNqQiIsImZpbGUiOiJsZXNzL3N0eWxlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xuICBiYWNrZ3JvdW5kOiByZWQ7XG59XG4iXX0= */\n');
          });
      });
    });
});

