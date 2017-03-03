const
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    util   = require('gulp-util'),
    config = util.env.config,
    gulp   = util.env.gulp
;

module.exports = function() {
    return gulp
        .src(config.javascript.source)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', notify.onError({
            message: '<%= error.message %>',
            title: 'JSHint error'
        }))
    ;
};
