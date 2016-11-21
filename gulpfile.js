var config      = require('./gulp-config');
var runSequence = require('run-sequence');
var gulp        = require('gulp');
var del         = require('del');
var browserSync = require('browser-sync');
var watch       = require('gulp-watch');

gulp.task('fonticon', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/fonticon'));
gulp.task('fonts', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/fonts'));
gulp.task('images', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/images'));
gulp.task('less', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/less'));
gulp.task('lesshint', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/lesshint'));
gulp.task('lib', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/lib'));
//gulp.task('sass', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/sass'));
gulp.task('scripts', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/scripts'));
gulp.task('views', require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/views'));

/**
 * Clean build directory
 */
gulp.task('clean', function(cb) {
    del([
        config.destination.assetsFolder + config.destination.cssFolderName,
        config.destination.assetsFolder + config.destination.fontFolderName,
        config.destination.assetsFolder + config.destination.imagesFolderName,
        config.destination.assetsFolder + config.destination.jsFolderName,
        config.destination.assetsFolder + config.destination.libFolderName,
        config.destination.assetsFolder + config.destination.viewsFolderName,
    ], cb);
});

/**
 * Build app from sources
 */
gulp.task('build', ['clean'], function() {
    return runSequence([
        'fonticon',
        'fonts',
        'images',
        'less',
        'lesshint',
        'lib',
//        'sass',
        'scripts',
        'views'
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
//    watch(config.source.fontIcon, function() {
//        return runSequence(['fonticon']);
//    })
//    watch(config.source.fontFileList, function() {
//        return runSequence(['fonts']);
//    })
//    watch(config.source.imageFileList, function() {
//        return runSequence(['images']);
//    })
    watch(config.source.lessWatchFileList, function() {
        return runSequence(['less']);
    });
//    watch(config.source.libFileList, function() {
//        return runSequence(['lib']);
//    })
//    watch(config.source.sassWatchFileList, function() {
//        return runSequence(['sass']);
//    })
//    watch(config.source.jsFileList, function() {
//        return runSequence(['scripts']);
//    })
    console.log(config.source.viewFileList);
    watch(config.source.viewFileList, function() {
        return runSequence(['views']);
    });
});

gulp.task('serve', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build'], function () { });
