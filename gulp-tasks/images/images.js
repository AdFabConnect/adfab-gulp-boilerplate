const config       = require('../../../boilerplate-config.json');
var gulp          = require('gulp');
var imagemin      = require('gulp-imagemin');

// TODO : optimize images with gulp-imagemin and gulp-svgmin

module.exports = function() {
  return gulp.src(config.source.imageFileList)
    .pipe(imagemin())
    .pipe(gulp.dest(config.destination.assetsFolder + config.destination.imagesFolderName));
};
