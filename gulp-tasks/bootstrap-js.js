const config       = require('../../../gulp-config');
const gulp         = require('gulp');

//On copie le js de boostrap dans notre infra
module.exports = function() {
    return gulp.src(config.source.bootStrapJsEntryFile)
        .pipe(gulp.dest(config.destination.assetsFolder + config.destination.jsFolderName));
};