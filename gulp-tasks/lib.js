var config        = require('../../../gulp-config');
var gulp          = require('gulp');
var concat = require('gulp-concat');

// TODO : optimize images with gulp-imagemin and gulp-svgmin

module.exports = function() {
  return gulp.src(config.source.libFileList)
  	.pipe(concat(config.destination.libFileName))
    .pipe(gulp.dest(config.destination.assetsFolder + config.destination.libFolderName));
};
