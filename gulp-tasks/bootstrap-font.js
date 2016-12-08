const config       = require('../../../gulp-config');
const gulp         = require('gulp');

var fonts = [config.source.bootStrapSass + 'assets/fonts/**/*'];

//On copie les fonts de boostrap dans notre infra
module.exports = function() {
    return gulp.src(fonts)
        .pipe(gulp.dest(config.destination.assetsFolder + config.destination.fontsFolderName));
};

