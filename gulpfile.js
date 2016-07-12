var config      = require('./gulp-config');
var runSequence = require('run-sequence');
var gulp        = require('gulp');
var del         = require('del');
var browserSync  = require('browser-sync');

gulp.task('scripts', require('./gulp-tasks/scripts'));
gulp.task('styles', require('./gulp-tasks/less'));
gulp.task('images', require('./gulp-tasks/images'));
gulp.task('fonts', require('./gulp-tasks/fonts'));
gulp.task('lib', require('./gulp-tasks/lib'));
gulp.task('views', require('./gulp-tasks/views'));
gulp.task('fonticon', require('./gulp-tasks/fonticon'));

/**
 * Clean build directory
 */
gulp.task('clean', function(cb) {
    del([config.destination.assetsFolder + config.destination.fontFolderName,
        config.destination.assetsFolder + config.destination.cssFolderName,
        config.destination.assetsFolder + config.destination.libFolderName,
        config.destination.assetsFolder + config.destination.jsFolderName,
        config.destination.assetsFolder + config.destination.viewsFolderName,
        config.destination.assetsFolder + config.destination.imagesFolderName
    ], cb);
});

/**
 * Build app from sources
 */
gulp.task('build', ['clean'], function() {
    return runSequence(['scripts', 'lib', 'fonts', 'images', 'fonticon', 'styles', 'views']);
});

//BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: config.vhost
    });
});

/**
 * Watch task for development
 */
gulp.task('watch', ['build'],  function() {
    gulp.watch(config.source.jsFileList, ['scripts']);
    gulp.watch(config.source.libFileList, ['lib']);
    gulp.watch(config.source.fontFileList, ['fonts']);
    gulp.watch(config.source.imageFileList, ['images']);
    gulp.watch(config.source.fontIcon, ['fonticon']);
    gulp.watch(config.source.cssWatchFileList, ['styles']);
    gulp.watch(config.source.viewFileList, ['views']);
});

gulp.task('serve', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build'], function () { });
