const
    plumber  = require('gulp-plumber'),
    notify   = require('gulp-notify'),
    lesshint = require('gulp-lesshint'),
    util     = require('gulp-util'),
    config   = util.env.config,
    gulp     = util.env.gulp
;

module.exports = function() {
    return gulp
        .src(config.less.source)
        .pipe(plumber({errorHandler: notify.onError({
            message: '<%= error.message %>',
            title: 'Less Error'
        })}))
        .pipe(lesshint())
        .pipe(lesshint.reporter())
        .pipe(notify('Successfully compiled Less'))
    ;
};