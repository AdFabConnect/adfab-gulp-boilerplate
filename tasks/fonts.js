module.exports = function() {
    var config        = require('../../../gulp-config');
    var gulp          = require('gulp');

    var fontsConfig = config.tasks.fonts;

    return gulp.src(fontsConfig.source, {cwd: config.sourceRoot})
        .pipe(gulp.dest(config.destinationRoot + fontsConfig.destination));
};