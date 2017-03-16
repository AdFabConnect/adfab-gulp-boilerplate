var config        = require('../../../gulp-config');
var gulp          = require('gulp');
var imagemin      = require('gulp-imagemin');

var imagesConfig = config.tasks.images;

module.exports = function() {
  return gulp.src(imagesConfig.compileFileList)
    .pipe(imagemin())
    .pipe(gulp.dest(imagesConfig.destinationFolder));
};
