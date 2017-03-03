const
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    iconfont    = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    util        = require('gulp-util'),
    config      = util.env.config,
    gulp        = util.env.gulp
;

module.exports = function() {
    return gulp
        .src(config.fonticon.source)
        .pipe(plumber({errorHandler: notify.onError({
            message: '<%= error.message %>',
            title: 'Views Error'
        })}))
        .pipe(iconfontCss({
            fontName: config.fonticon.name,
            path: config.fonticon.path,
            targetPath: config.fonticon.targetPath,
            fontPath: config.fonticon.destination
        }))
        .pipe(iconfont({
            fontName: config.destination.fontIconFontName,
            formats: ['ttf', 'eot', 'woff', 'woff2']
        }))
        .pipe(gulp.dest(config.fonticon.destination))
        .pipe(notify({
            message: 'Successfully compiled SVG font icon',
            onLast: true
        }))
        .on('error', function() {
            this.emit('error', new Error('SVG font icon compilation Error'));
        })
    ;
};
