const config       = require('../gulp-config');
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

// TODO : optimize css with gulp-cssmin and gulp-uncss
// TODO : configure autoprefixer only for the targeted browsers
module.exports = function() {
  return gulp.src(config.source.sassCompileFileList)
    .pipe(plumber({
        errorHandler: notify.onError({
            message: "<%= error.message %>",
            title: "SASS Error"
        })
    }))
    .pipe(gulpif(!util.env.production, sourcemaps.init()))
    .pipe(sass())
    .pipe(concat(config.destination.cssFileName))
    .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie 9', 'iOS >= 7'] }))
    .pipe(gulpif(util.env.production, cleanCss()))
    .pipe(gulpif(!util.env.prodction, sourcemaps.write()))
    .pipe(gulp.dest(config.destination.assetsFolder + config.destination.cssFolderName))
    .pipe(browserSync.stream())
    .pipe(notify('Successfully compiled SASS'))
    .on('error', function() {
      this.emit("error", new Error("SASS compilation Error"));
    });
};
