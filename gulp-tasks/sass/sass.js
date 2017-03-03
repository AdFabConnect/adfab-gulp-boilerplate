const
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify       = require('gulp-notify'),
    sourcemaps   = require('gulp-sourcemaps'),
    cleanCss     = require('gulp-clean-css'),
    gulpif       = require('gulp-if'),
    browserSync  = require('browser-sync'),
    util         = require('gulp-util'),
    config       = util.env.config,
    gulp         = util.env.gulp
;

// TODO : optimize css with gulp-cssmin and gulp-uncss
// TODO : configure autoprefixer only for the targeted browsers

module.exports = function() {
    const
        includePaths      = config.sass.includePaths,
        sassConfiguration = {}
    ;

    if (includePaths.length !== 0) {
        sassConfiguration.includePaths = [ includePaths ];
    }

    return gulp
        .src(config.sass.source)
        .pipe(plumber({
            errorHandler: notify.onError({
                message: '<%= error.message %>',
                title: 'SASS Error'
            })
        }))
        .pipe(gulpif( ! util.env.production, sourcemaps.init()))
        .pipe(sass(sassConfiguration))
        .pipe(autoprefixer({
            browsers: [ 'last 2 versions', 'ie 9', 'iOS >= 7' ]
        }))
        .pipe(gulpif(util.env.production, cleanCss()))
        .pipe(gulpif( ! util.env.production, sourcemaps.write()))
        .pipe(gulp.dest(config.sass.destination))
        .pipe(browserSync.stream())
        .pipe(notify('Successfully compiled SASS'))
        .on('error', function() {
        this.emit('error', new Error('SASS compilation Error'));
        })
    ;
};
