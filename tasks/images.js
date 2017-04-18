module.exports = function() {
    var config        = require('../../../gulp-config');
    var gulp          = require('gulp');
    var imagemin      = require('gulp-imagemin');

    var imagesConfig = config.tasks.images;

    return gulp.src(imagesConfig.source, {cwd: config.sourceRoot})
        .pipe(imagemin())
        .pipe(gulp.dest(config.destinationRoot + imagesConfig.destination));
};
