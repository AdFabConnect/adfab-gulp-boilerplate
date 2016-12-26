var config  = require('../../../gulp-config');
var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var gulpif = require('gulp-if');

module.exports = function() {
  return gulp.src(config.source.viewFileList)
    .pipe(plumber({errorHandler: notify.onError({
      message: "<%= error.message %>",
      title: "Views Error"
    })}))
    .pipe(gulpif(config.minifyHTML, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(config.destination.assetsFolder + config.destination.viewsFolderName))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Successfully compiled Views', onLast: true}))
    .on('error', function() {
      this.emit("error", new Error("Views compilation Error"));
    });
};
