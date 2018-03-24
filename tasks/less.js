module.exports = function(configName) {
    const gulp = require('gulp');
    const plumber = require('gulp-plumber');
    const notify = require('gulp-notify');
    const gulpif = require('gulp-if');
    const browserSync = require('browser-sync');
    const lessPipe = require('../pipe/less');
    const util = require('gulp-util');
    
    const config = util.env.boilerplate.config;
    const lessConfig = config.tasks[configName];

    const isWatching = ['serve', 'watch'].indexOf(process.argv[2]) >= 0;

    return gulp.src(lessConfig.source, {cwd: config.sourceRoot})
        .pipe(plumber({
            errorHandler: notify.onError({
                message: '<%= error.message %>',
                title: 'Less Error'
            })
        }))
        .pipe(lessPipe())
        .pipe(gulp.dest(config.destinationRoot + lessConfig.destination))
        .pipe(gulpif(isWatching, browserSync.stream({once: true})))
        .pipe(notify('Successfully compiled Less ' + configName));
};