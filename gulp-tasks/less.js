module.exports = function() {
    var config        = require('../../../gulp-config');
    var gulp          = require('gulp');
    var plumber       = require('gulp-plumber');
    var less          = require('gulp-less');
    var autoprefixer  = require('gulp-autoprefixer');
    var notify        = require('gulp-notify');
    var concat        = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');
    var cleanCss = require('gulp-clean-css');
    var gulpif = require('gulp-if');
    var util = require('gulp-util');
    var browserSync = require('browser-sync');
    var lesshint = require('gulp-lesshint');

    var lessConfig = config.tasks.less;

    var isWatching = ['serve', 'watch'].indexOf(process.argv[2]) >= 0;

    return gulp.src(lessConfig.source, {cwd: config.sourceRoot})
        .pipe(plumber({errorHandler: notify.onError({
            message: "<%= error.message %>",
            title: "Less Error"
        })}))
        .pipe(gulpif(!util.env.production, sourcemaps.init()))
        .pipe(less())
        // .pipe(concat(config.destination.cssFileName))
        .pipe(autoprefixer({ browsers: lessConfig.browsers }))
        .pipe(gulpif(util.env.production, cleanCss()))
        .pipe(gulpif(!util.env.prodction, sourcemaps.write()))
        .pipe(gulp.dest(config.destinationRoot + lessConfig.destination))
        .pipe(gulpif(isWatching, browserSync.stream({once: true})))
        .pipe(notify('Successfully compiled Less'))
};