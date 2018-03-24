module.exports = function(configName) {
    const gulp          = require('gulp');
    const imagemin      = require('gulp-imagemin');

    const util = require('gulp-util');
    
    const config = util.env.boilerplate.config;
    const imagesConfig = config.tasks[configName];

    return gulp.src(imagesConfig.source, {cwd: config.sourceRoot})
        .pipe(imagemin())
        .pipe(gulp.dest(config.destinationRoot + imagesConfig.destination));
};
