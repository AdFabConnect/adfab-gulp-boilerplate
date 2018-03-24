module.exports = function(configName) {
    const gulp    = require('gulp');
    const plumber = require('gulp-plumber');
    const notify  = require('gulp-notify');
    const htmlmin = require('gulp-htmlmin');
    const browserSync = require('browser-sync');
    const gulpif = require('gulp-if');
    const util = require('gulp-util');
    
    const config = util.env.boilerplate.config;
    const viewsConfig = config.tasks[configName];

    const isWatching = ['serve', 'watch'].indexOf(process.argv[2]) >= 0;

    return gulp.src(viewsConfig.source, {cwd: config.sourceRoot})
        .pipe(plumber({errorHandler: notify.onError({
            message: '<%= error.message %> in <%= error.fileName %>',
            title: 'Views Error'
        })}))
        .pipe(gulpif(viewsConfig.minifyHTML, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(config.destinationRoot + viewsConfig.destination))
        .pipe(gulpif(isWatching, browserSync.stream({once: true})))
        .pipe(notify({ message: 'Successfully compiled Views', onLast: true}))
        .on('error', function() {
            this.emit('error', new Error('Views compilation Error'));
        });
};
