module.exports = function() {
    var config  = require('../../../gulp-config');
    var gulp    = require('gulp');
    var plumber = require('gulp-plumber');
    var notify  = require('gulp-notify');
    var htmlmin = require('gulp-htmlmin');
    var browserSync = require('browser-sync');
    var gulpif = require('gulp-if');

    var viewsConfig = config.tasks.views;

    var isWatching = ['serve', 'watch'].indexOf(process.argv[2]) >= 0;

    return gulp.src(viewsConfig.source, {cwd: config.sourceRoot})
        .pipe(plumber({errorHandler: notify.onError({
          message: "<%= error.message %> in <%= error.fileName %>",
          title: "Views Error"
        })}))
        .pipe(gulpif(viewsConfig.minifyHTML, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(config.destinationRoot + viewsConfig.destination))
        .pipe(gulpif(isWatching, browserSync.stream({once: true})))
        .pipe(notify({ message: 'Successfully compiled Views', onLast: true}))
        .on('error', function() {
          this.emit("error", new Error("Views compilation Error"));
        });
};
