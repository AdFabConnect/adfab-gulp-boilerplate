var config      = require('./gulp-config');
var runSequence = require('run-sequence');
var gulp        = require('gulp');
var del         = require('del');
var browserSync  = require('browser-sync');

//gulp.task('fonticon', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/fonticon'));
//gulp.task('fonts', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/fonts'));
//gulp.task('images', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/images'));
//gulp.task('less', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/less'));
//gulp.task('lesshint', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/lesshint'));
//gulp.task('lib', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/lib'));
//gulp.task('scripts', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/scripts'));
//gulp.task('sass', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/sass'));
//gulp.task('views', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/views'));

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
    return runSequence([
//        'fonticon',
//        'fonts',
//        'images',
//        'less',
//        'lesshint',
//        'lib',
//        'sass',
//        'scripts',
//        'views'
    ]);
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
//    gulp.watch(config.source.fontIcon, ['fonticon']);
//    gulp.watch(config.source.fontFileList, ['fonts']);
//    gulp.watch(config.source.imageFileList, ['images']);
//    gulp.watch(config.source.cssWatchFileList, ['less', 'lesshint']);
//    gulp.watch(config.source.libFileList, ['lib']);
//    gulp.watch(config.source.sassWatchFileList, ['sass']);
//    gulp.watch(config.source.jsFileList, ['scripts']);
//    gulp.watch(config.source.viewFileList, ['views']);
});

gulp.task('serve', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build'], function () { });
