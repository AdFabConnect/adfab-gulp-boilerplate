const
    notify      = require('gulp-notify'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    gulpif      = require('gulp-if'),
    watchify    = require('watchify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    uglify      = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    util        = require('gulp-util'),
    config      = util.env.config,
    gulp        = util.env.gulp,
    isServer    = (process.argv[2] === 'serve')
;

let isFirstBuild = true;

module.exports = function(watch) {
    // Error notifications
    const handleError = function(task) {
        return function(err) {
            notify.onError({
                message: task + ' failed, check the logs..'
            })(err);
            util.log(util.colors.bgRed(task + ' error:'), util.colors.red(err));

            this.emit('end');
        };
    };

    let bundler = browserify(
        config.javascript.source,
        {
            debug: ! util.env.production,
            cache: {},
            packageCache: {},
        }
    ).transform('babelify', { presets: [ 'es2015' ] })

    if (isServer) {
        bundler = watchify(bundler);
    }

    const bundle = function() {
        return bundler
            .bundle()
            .on('error', handleError('JS'))
            .pipe(source(config.javascript.name))
            .pipe(buffer())
            .pipe(gulpif(
                util.env.production,
                uglify().on('error', function(err) {
                    util.log(
                        util.colors.bgRed('UglifyJS error:'),
                        util.colors.red(err)
                    )
                })
            ))
            .pipe(gulp.dest(config.javascript.destination))
            .pipe(gulpif(isServer, browserSync.stream({ once: true })))
            .pipe(notify('Successfully compiled JS'))
        ;
    };

    if (isServer) {
        bundler.on('update', bundle);
    }

    return bundle();
};