module.exports = function() {
    var config        = require('../../../gulp-config');
    var gulp          = require('gulp');
    var plumber       = require('gulp-plumber');
    var notify        = require('gulp-notify');
    var lesshint = require('gulp-lesshint');

    var lesshintConfig = config.tasks.lesshint;

    return gulp.src(lesshintConfig.source, {cwd: config.sourceRoot })
        .pipe(plumber({errorHandler: notify.onError({
            message: "<%= error.message %>",
            title: "Less hint Error"
        })}))
        .pipe(lesshint())
        .pipe(lesshint.reporter())
        .pipe(notify({message: 'Successfully hint Less', onLast: true }))
};