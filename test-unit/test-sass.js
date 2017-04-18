'use strict';

var config      = require('../gulp-config');
var assert = require('assert');

var fromString = require('./helpers/pipe');
var chai = require('chai');
chai.use(require('chai-fs'));

var expect = chai.expect;

var gulp = require('gulp');

const sassPipe = require('../pipe/sass');

describe('gulp sass', function() {
    describe('compiled sass', function() {
      it('generates correct css output', function() {
          var input = '$color: red; body { background: $color; }';
          var result = 'test';
          return fromString(input, 'sass/style.scss', sassPipe).then(output => {
              var result = output.contents.toString();
              var fs = require('fs');
              fs.writeFile('test.css', result);
              expect(result).to.equal('body {\n  background: red; }\n\n/*# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQixFQUFFIiwiZmlsZSI6InNhc3Mvc3R5bGUuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gIGJhY2tncm91bmQ6IHJlZDsgfVxuIl19 */\n');
          });
      });
    });
});
