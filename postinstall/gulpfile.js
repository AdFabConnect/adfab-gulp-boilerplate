const config      = require('./gulp-config.json');
const runSequence = require('run-sequence');
const gulp        = require('gulp');
const del         = require('del');
const browserSync = require('browser-sync');
const watch       = require('gulp-watch');
const util = require('gulp-util');
var fs = require('fs');

var cleanFolderList = [];
var taskList = [];
var watchTaskList = [];

util.env.boilerplate = {
    config
};

for(var taskName in config.tasks) {
    if (config.tasks.hasOwnProperty(taskName)) {
        if(fs.existsSync('./gulp-tasks/' + taskName + '.js')) {
            gulp.task(taskName, require('./gulp-tasks/' + taskName));
        } else {
            gulp.task(taskName, require('./node_modules/adfab-gulp-boilerplate/tasks/' + taskName));
        }
        var task = config.tasks[taskName];
        taskList.push(taskName);
        if(task.hasOwnProperty('destination') && (!task.hasOwnProperty('clean') || task.clean)) {
            cleanFolderList.push(config.tasks[taskName].destination);
        }
        if(task.hasOwnProperty('watch')) {
            watchTaskList.push({'task': taskName, 'fileList': task.watch });
        } else if(task.hasOwnProperty('source')) {
            // 'scripts' task is bundled with babel, watch is managed in 'scripts' task
            if(taskName !== 'scripts') {
                watchTaskList.push({'task': taskName, 'fileList': task.source });
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