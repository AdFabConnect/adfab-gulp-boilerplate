module.exports = function() {
    var config      = require('../../../gulp-config');
    var gulp = require('gulp');
    var plumber       = require('gulp-plumber');
    var notify        = require('gulp-notify');
    var sourcemaps = require('gulp-sourcemaps');
    var browserify = require('browserify');
    var babelify = require('babelify');
    var concat = require('gulp-concat');
    var gulpif = require('gulp-if');
    var util = require('gulp-util');
    var watchify = require('watchify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var uglify = require('gulp-uglify');
    var browserSync = require('browser-sync');

    var scriptConfig = config.tasks.scripts;

    var isWatching = ['serve', 'watch'].indexOf(process.argv[2]) >= 0;
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
    }).transform('babelify', { presets: [scriptConfig.babelPresets] })
    if(isWatching) {
        bundler = watchify(bundler);
    }

    var bundle = function() {
        return bundler.bundle()
            .on('error', handleError('JS'))
            .pipe(source(scriptConfig.destinationFile))
            .pipe(buffer())
            .pipe(gulpif(util.env.production, uglify().on('error', function(err) {
                util.log(util.colors.bgRed('UglifyJS error:'), util.colors.red(err))
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