var config      = require('./gulp-config');
var runSequence = require('run-sequence');
var gulp        = require('gulp');
var del         = require('del');
var browserSync = require('browser-sync');
var watch       = require('gulp-watch');

var cleanFolderList = [];
var taskList = [];
var watchTaskList = [];

// Lists task to require those defined in gulp-config
for(taskName in config.tasks) {
    if (config.tasks.hasOwnProperty(taskName)) {
        gulp.task(taskName, require('./node_modules/adfab-gulp-boilerplate/gulp-tasks/' + taskName));
        taskList.push(taskName);
        if(config.tasks[taskName].hasOwnProperty('destinationFolder')) {
            cleanFolderList.push(config.destinationRoot + config.tasks[taskName].destinationFolder);
        }
        
        if(config.tasks[taskName].hasOwnProperty('watch')) {
            watchTaskList.push({'task': taskName, 'fileList': config.tasks[taskName].watch })
        } else {
            watchTaskList.push({'task': taskName, 'fileList': config.tasks[taskName].source })
        }
    }
}

/**
 * Clean build directory
 */
gulp.task('clean', function(cb) {
    del(cleanFolderList, cb);
});

/**
 * Build app from sources
 */
gulp.task('build', ['clean'], function() {
    return runSequence(taskList);
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
    for(var index in watchTaskList) {
        var watchTask = watchTaskList[index];
        watch(watchTask.fileList, {base: config.sourceRoot}, function() {
            return runSequence([watchTask.task]);
        });
    }
});

gulp.task('serve', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build'], function () { });
