var config        = require('../../../gulp-config');
var gulp          = require('gulp');

// TODO : optimize images with gulp-imagemin and gulp-svgmin

module.exports = function() {
  return gulp.src(config.source.imageFileList)
    .pipe(gulp.dest(config.destination.assetsFolder + config.destination.imagesFolderName));
};
