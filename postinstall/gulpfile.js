const config      = require('./gulp-config.json');
const runSequence = require('run-sequence');
const gulp        = require('gulp');
const del         = require('del');
const browserSync = require('browser-sync');
const watch       = require('gulp-watch');
const util = require('gulp-util');

var cleanFolderList = [];
var taskList = [];
var watchTaskList = [];

util.env.boilerplate = {
    config
};

for(var taskName in config.tasks) {
    if (config.tasks.hasOwnProperty(taskName)) {
        gulp.task(taskName, require('./node_modules/adfab-gulp-boilerplate/tasks/' + taskName));
        taskList.push(taskName);
        if(config.tasks[taskName].hasOwnProperty('destination')) {
            cleanFolderList.push(config.tasks[taskName].destination);
        }
        if(config.tasks[taskName].hasOwnProperty('watch')) {
            watchTaskList.push({'task': taskName, 'fileList': config.tasks[taskName].watch });
        } else if(config.tasks[taskName].hasOwnProperty('source')) {
            // 'scripts' task is bundled with babel, watch is managed in 'scripts' task
            if(taskName !== 'scripts') {
                watchTaskList.push({'task': taskName, 'fileList': config.tasks[taskName].source });
            }
        }
    }
}

/**
 * Clean build directory
 */
gulp.task('clean', function() {
    return del(cleanFolderList, { cwd: config.destinationRoot });
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
        watch(watchTask.fileList, { cwd: config.sourceRoot }, function(task) {
            return function() {
                return runSequence([task]);
            };
        }(watchTask.task));
    }
});

gulp.task('serve', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build'], function () { });