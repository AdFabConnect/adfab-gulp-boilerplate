module.exports = function(configName) {
    const gulp = require('gulp');
    const notify = require('gulp-notify');
    const util = require('gulp-util');
    
    const config = util.env.boilerplate.config;
    const fontsConfig = config.tasks[configName];

    return gulp.src(fontsConfig.source, {cwd: config.sourceRoot})
        .pipe(gulp.dest(config.destinationRoot + fontsConfig.destination))
        .pipe(notify('Successfully copy ' + configName));;
};