module.exports = function() {
    const gulp          = require('gulp');
    const notify = require('gulp-notify');
    const browserify = require('browserify');
    const uglify = require('gulp-uglify');
    const source = require('vinyl-source-stream');
    const buffer = require('vinyl-buffer');
    const util = require('gulp-util');

    const config = util.env.boilerplate.config;
    const jslibsConfig = config.tasks.jslibs;


    // Error notifications
    var handleError = function(task) {
        return function(err) {
            notify.onError({
                message: task + ' failed, check the logs..'
            })(err);
            util.log(util.colors.bgRed(task + ' error:'), util.colors.red(err));

            this.emit('end');
        };
    };

    var bundler = browserify({
        debug: !util.env.production,
        cache: {},
        packageCache: {},
    });

    jslibsConfig.source.forEach(function(lib) {
        bundler.require(lib);
    });

    return bundler.bundle()
        .on('error', handleError('JS'))
        .pipe(source(jslibsConfig.destinationFile))
        .pipe(buffer())
        .pipe(uglify().on('error', function(err) {
            util.log(util.colors.bgRed('UglifyJS error:'), util.colors.red(err));
        }))
        .pipe(gulp.dest(config.destinationRoot + jslibsConfig.destination))
        .pipe(notify({message: 'Successfully compiled JS libs', onLast: true}));
};
