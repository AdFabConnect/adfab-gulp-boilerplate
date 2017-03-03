const
    concat = require('gulp-concat'),
    util   = require('gulp-util'),
    config = util.env.config,
    gulp   = util.env.gulp
;


module.exports = function() {
    return gulp
        .src(config.libraries.source)
        .pipe(concat(config.libraries.name))
        .pipe(gulp.dest(config.libraries.destination))
    ;
};
