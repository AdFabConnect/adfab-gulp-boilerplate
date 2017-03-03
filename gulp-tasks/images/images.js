const
    imagemin = require('gulp-imagemin'),
    util     = require('gulp-util'),
    config   = util.env.config,
    gulp     = util.env.gulp
;

module.exports = function() {
    return gulp
        .src(config.images.source)
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.destination))
    ;
};
