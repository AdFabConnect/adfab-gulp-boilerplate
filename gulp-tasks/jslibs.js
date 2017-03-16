var config        = require('../../../gulp-config');
var gulp          = require('gulp');
var concat = require('gulp-concat');

var jslibsConfig = config.tasks.jslibs;

module.exports = function() {
  return gulp.src(jslibsConfig.compileFileList)
  	.pipe(concat(jslibsConfig.destinationFileName))
    .pipe(gulp.dest(jslibsConfig.destinationFolder));
};
