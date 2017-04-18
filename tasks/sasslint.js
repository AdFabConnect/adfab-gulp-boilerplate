module.exports = function() {
    var config        = require('../../../gulp-config');
    var gulp          = require('gulp');
    var plumber       = require('gulp-plumber');
    var notify        = require('gulp-notify');
    var sassLint = require('gulp-sass-lint');

    var sasslintConfig = config.tasks.sasslint;
    
    var options = {};
    if(sasslintConfig.ignore) {
        options.files = { ignore: sasslintConfig.ignore };
    }

    return gulp.src(sasslintConfig.source, {cwd: config.sourceRoot })
        .pipe(plumber({errorHandler: notify.onError({
            message: "<%= error.message %>",
            title: "Sass lint Error"
        })}))
        .pipe(sassLint(options))
        .pipe(sassLint.format())
        .pipe(notify({message: 'Successfully lint Sass', onLast: true }))
};