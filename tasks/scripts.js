module.exports = function() {
    const gulp = require('gulp');
    const notify = require('gulp-notify');
    const browserify = require('browserify');
    const babelify = require('babelify'); // eslint-disable-line no-unused-vars
    const gulpif = require('gulp-if');
    const watchify = require('watchify');
    const source = require('vinyl-source-stream');
    const buffer = require('vinyl-buffer');
    const uglify = require('gulp-uglify');
    const browserSync = require('browser-sync');
    const util = require('gulp-util');

    const config = util.env.boilerplate.config;
    const scriptConfig = config.tasks.scripts;
    const vendors = config.tasks.jslibs.source;

    const isWatching = ['serve', 'watch'].indexOf(process.argv[2]) >= 0;
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

    // TODO: If no babel presets, don't use babel at all
    var bundler = browserify( scriptConfig.source, {
        basedir: config.sourceRoot,
        debug: !util.env.production,
        cache: {},
        packageCache: {},
    })
    .external(vendors)
    .transform('babelify', { presets: [scriptConfig.babelPresets] });

    if(isWatching) {
        bundler = watchify(bundler);
    }

    var bundle = function() {
        return bundler.bundle()
            .on('error', handleError('JS'))
            .pipe(source(scriptConfig.destinationFile))
            .pipe(buffer())
            .pipe(gulpif(util.env.production, uglify().on('error', function(err) {
                util.log(util.colors.bgRed('UglifyJS error:'), util.colors.red(err));
            })))
            .pipe(gulp.dest(config.destinationRoot + scriptConfig.destination))
            .pipe(gulpif(isWatching, browserSync.stream({once: true})))
            .pipe(notify({message: 'Successfully compiled JS', onLast: true}));
    };
    if(isWatching) {
        bundler.on('update', bundle);
    }

    return bundle();
};