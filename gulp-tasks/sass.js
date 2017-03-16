const config       = require('../../../gulp-config');
const gulp         = require('gulp');
const plumber      = require('gulp-plumber');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const notify       = require('gulp-notify');
const concat       = require('gulp-concat');
const sourcemaps   = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const gulpif       = require('gulp-if');
const util         = require('gulp-util');
const browserSync  = require('browser-sync');

var sassConfig = config.tasks.sass;

// TODO : optimize css with gulp-cssmin and gulp-uncss
// TODO : configure autoprefixer only for the targeted browsers
module.exports = function() {
  return gulp.src(sassConfig.compileFileList)
    .pipe(plumber({
        errorHandler: notify.onError({
            message: "<%= error.message %>",
            title: "SASS Error"
        })
    }))
    .pipe(gulpif(!util.env.production, sourcemaps.init()))
    .pipe(sass(sassConfig.config))
    .pipe(autoprefixer({ browsers: sassConfig.browsers }))
    .pipe(gulpif(util.env.production, cleanCss()))
    .pipe(gulpif( ! util.env.production, sourcemaps.write()))
    .pipe(gulp.dest(sassConfig.destinationFolder))
    .pipe(browserSync.stream())
    .pipe(notify('Successfully compiled SASS'))
    .on('error', function() {
      this.emit("error", new Error("SASS compilation Error"));
    });
};
