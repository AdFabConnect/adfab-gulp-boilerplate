module.exports = function() {
    const gulp = require('gulp');
    const util = require('gulp-util');
    
    const config = util.env.boilerplate.config;
    const fontsConfig = config.tasks.fonts;

    return gulp.src(fontsConfig.source, {cwd: config.sourceRoot})
        .pipe(gulp.dest(config.destinationRoot + fontsConfig.destination));
};