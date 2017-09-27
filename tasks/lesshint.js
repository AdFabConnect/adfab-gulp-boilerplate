module.exports = function() {
    const gulp = require('gulp');
    const plumber = require('gulp-plumber');
    const notify = require('gulp-notify');
    const lesshint = require('gulp-lesshint');
    const util = require('gulp-util');

    const config = util.env.boilerplate.config;
    const lesshintConfig = config.tasks.lesshint;

    return gulp.src(lesshintConfig.source, {cwd: config.sourceRoot })
        .pipe(plumber({errorHandler: notify.onError({
            message: '<%= error.message %>',
            title: 'Less hint Error'
        })}))
        .pipe(lesshint())
        .pipe(lesshint.reporter());
};