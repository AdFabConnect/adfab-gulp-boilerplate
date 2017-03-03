const
    util   = require('gulp-util'),
    config = util.env.config,
    gulp   = util.env.gulp
;

module.exports = function() {
    return gulp
        .src(config.copy.source)
        .pipe(gulp.dest(config.copy.destination))
    ;
};
