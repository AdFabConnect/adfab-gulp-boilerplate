var config      = require('./gulp-config');
var runSequence = require('run-sequence');
var gulp        = require('gulp');
var del         = require('del');
var browserSync = require('browser-sync');
var watch       = require('gulp-watch');

var cleanFolderList = [];
var taskList = [];
var watchTaskList = [];

for(taskName in config.tasks) {
    if (config.tasks.hasOwnProperty(taskName)) {
        gulp.task(taskName, require('./tasks/' + taskName));
        taskList.push(taskName);
        if(config.tasks[taskName].hasOwnProperty('destination')) {
            cleanFolderList.push(config.tasks[taskName].destination);
        }
        if(config.tasks[taskName].hasOwnProperty('watch')) {
            watchTaskList.push({'task': taskName, 'fileList': config.tasks[taskName].watch })
        } else if(config.tasks[taskName].hasOwnProperty('source')) {
            watchTaskList.push({'task': taskName, 'fileList': config.tasks[taskName].source })
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
            }
        }(watchTask.task));
    }
});

gulp.task('serve', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build'], function () { });



//npm install gulp gulp-mocha

var mocha = require('gulp-mocha');
var fs = require('fs');

gulp.task('test-unit', function() {
    for(var index in taskList) {
        var taskName = taskList[index];
        try {
            // Checks if task has a unit test file
            fs.statSync('test-unit/test-' + taskName + '.js');
    
            gulp.src(['test-unit/test-' + taskName + '.js'], { read: false })
            .pipe(mocha({
                reporter: 'spec'
            }));
        } catch (err) {
            console.log('no unit test for ' + taskName);
        }
    }
    
    return true;
});

gulp.task('test-func', ['clean'], function() {
  for(var index in taskList) {
      var taskName = taskList[index];
      try {
          // Checks if task has a unit test file
          fs.statSync('test-func/test-' + taskName + '.js');

//          gulp.task(taskName + '-test', function() {
//            gulp.src(['test/test-' + taskName + '.js'], { read: false })
//            .pipe(mocha({
//              reporter: 'spec'
//            }));
//          }(taskName));
//          // Executes task
//          runSequence(taskName, taskName + '-test');
          // Runs task
          gulp.start(taskName);

          // Runs task tests
          gulp.src(['test/test-' + taskName + '.js'], { read: false })
          .pipe(mocha({
            reporter: 'spec'
          }));
      } catch (err) {
          console.log('no functionnal test for ' + taskName);
      }
  }
  return true;
});