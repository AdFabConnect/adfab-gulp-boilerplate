var config        = require('../gulp-config');
var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');
var lesshint = require('gulp-lesshint');

module.exports = function() {
    return gulp.src(config.source.cssWatchFileList)
        .pipe(plumber({errorHandler: notify.onError({
            message: "<%= error.message %>",
            title: "Less Error"
        })}))
        .pipe(lesshint())
        .pipe(lesshint.reporter())
        .pipe(notify('Successfully compiled Less'))
};