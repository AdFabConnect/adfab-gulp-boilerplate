var config        = require('../../../gulp-config');
var gulp          = require('gulp');

module.exports = function() {
  return gulp.src(config.source.fontFileList)
    .pipe(gulp.dest(config.destination.assetsFolder + config.destination.fontsFolderName));
};
