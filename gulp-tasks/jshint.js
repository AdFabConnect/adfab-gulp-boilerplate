var config  = require('../../../gulp-config');
var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var notify  = require('gulp-notify');

module.exports = function() {
  return gulp
    .src(config.path.scripts.concat([config.source.jsHintFileList]))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', notify.onError({
      message: "<%= error.message %>",
      title: "JSHint error"
    }))
};
