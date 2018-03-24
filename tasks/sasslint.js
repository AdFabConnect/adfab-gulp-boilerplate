module.exports = function(configName) {
    const gulp = require('gulp');
    const plumber = require('gulp-plumber');
    const notify = require('gulp-notify');
    const sassLint = require('gulp-sass-lint');
    const util = require('gulp-util');
    
    const config = util.env.boilerplate.config;
    const sasslintConfig = config.tasks[configName];

    var options = {};
    if(sasslintConfig.ignore) {
        options.files = { ignore: sasslintConfig.ignore };
    }

    return gulp.src(sasslintConfig.source, {cwd: config.sourceRoot })
        .pipe(plumber({errorHandler: notify.onError({
            message: '<%= error.message %>',
            title: 'Sass lint Error'
        })}))
        .pipe(sassLint(options))
        .pipe(sassLint.format());
};