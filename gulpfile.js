var gulp        = require('gulp');
var mocha = require('gulp-mocha');
var fs = require('fs');


// task list test
var taskList = [
    'sass',
    'less'
];

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


gulp.task('default', ['test-unit'], function () { });