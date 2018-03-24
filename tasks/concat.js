module.exports = function(configName) {
    const gulp          = require('gulp');
    const notify = require('gulp-notify');
    const concat = require('gulp-concat');
    const util = require('gulp-util');

    const config = util.env.boilerplate.config;
    const jslibsConfig = config.tasks[configName];

    return gulp.src(jslibsConfig.source, {cwd: config.sourceRoot})
        .pipe(concat(jslibsConfig.destinationFile))
        .pipe(gulp.dest(config.destinationRoot + jslibsConfig.destination))
        .pipe(notify({message: 'Successfully concat ' + configName, onLast: true }));
};