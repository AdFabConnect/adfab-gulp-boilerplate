module.exports = function(configName) {
    const gulp = require('gulp');
    const plumber = require('gulp-plumber');
    const notify = require('gulp-notify');
    const gulpif = require('gulp-if');
    const browserSync = require('browser-sync');
    const util = require('gulp-util');

    const config = util.env.boilerplate.config;
    const sassPipe = require('../pipe/sass');
    const sassConfig = config.tasks[configName];

    const isWatching = ['serve', 'watch'].indexOf(process.argv[2]) >= 0;

    return gulp.src(sassConfig.source, {cwd: config.sourceRoot})
    .pipe(plumber({
        errorHandler: notify.onError({
            message: '<%= error.message %>',
            title: 'SASS Error'
        })
    }))
    .pipe(sassPipe())
    .pipe(gulp.dest(config.destinationRoot + sassConfig.destination))
    .on('end', function() {
        if(sassConfig.hasOwnProperty('runafter')) {
            runSequence(sassConfig.runafter);
        }
    })
    .pipe(gulpif(isWatching, browserSync.stream()))
    .pipe(notify({ message: 'Successfully compiled SASS for task ' + configName, onLast: true }))
    .on('error', function() {
        this.emit('error', new Error(configName + ' compilation Error'));
    });
};
