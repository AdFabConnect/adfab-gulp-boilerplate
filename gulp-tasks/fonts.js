var config        = require('../../../gulp-config');
var gulp          = require('gulp');

var fontsConfig = config.tasks.fonts;

module.exports = function() {
  return gulp.src(fontsConfig.compileFileList)
    .pipe(gulp.dest(fontsConfig.destinationFolder));
};