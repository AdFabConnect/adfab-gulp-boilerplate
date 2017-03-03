const
    plumber      = require('gulp-plumber'),
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    notify       = require('gulp-notify'),
    concat       = require('gulp-concat'),
    sourcemaps   = require('gulp-sourcemaps'),
    cleanCss     = require('gulp-clean-css'),
    gulpif       = require('gulp-if'),
    browserSync  = require('browser-sync'),
    util         = require('gulp-util'),
    config       = util.env.config,
    gulp         = util.env.gulp
;

module.exports = function() {
    return gulp
        .src(config.less.source)
        .pipe(plumber({errorHandler: notify.onError({
            message: '<%= error.message %>',
            title: 'Less Error'
        })}))
        .pipe(gulpif( ! util.env.production, sourcemaps.init()))
        .pipe(less())
        .pipe(autoprefixer({ browsers: [ 'last 2 versions', 'ie 9' ] }))
        .pipe(gulpif(util.env.production, cleanCss()))
        .pipe(gulpif( ! util.env.prodction, sourcemaps.write()))
        .pipe(gulp.dest(config.less.destination))
        .pipe(browserSync.stream())
        .pipe(notify('Successfully compiled Less'))
    ;
};