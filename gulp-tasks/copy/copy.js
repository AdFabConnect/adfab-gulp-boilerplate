const
	util          = require('gulp-util'),
	configuration = util.env.config,
	gulp          = util.env.gulp
;

module.exports = function() {
    return gulp.src(fonts)
        .pipe(gulp.dest(config.destination.assetsFolder + config.destination.fontsFolderName));
};
