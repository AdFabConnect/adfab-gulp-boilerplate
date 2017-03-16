module.exports = function() {
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

    return gulp.src(sassConfig.source, {cwd: config.sourceRoot})
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
    .pipe(gulp.dest(config.destinationRoot + sassConfig.destination))
    .pipe(browserSync.stream())
    .pipe(notify('Successfully compiled SASS'))
    .on('error', function() {
      this.emit("error", new Error("SASS compilation Error"));
    });
};
