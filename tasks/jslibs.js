module.exports = function() {
    var config        = require('../../../gulp-config');
    var gulp          = require('gulp');
    var concat = require('gulp-concat');

    var jslibsConfig = config.tasks.jslibs;

    return gulp.src(jslibsConfig.source, {cwd: config.sourceRoot})
  	    .pipe(concat(jslibsConfig.destinationFile))
  	    .pipe(gulp.dest(config.destinationRoot + jslibsConfig.destination));
};
