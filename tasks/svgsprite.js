module.exports = function() {
    const config        = require('../../../gulp-config');
    const gulp          = require('gulp');
    var svgstore = require('gulp-svgstore');
    var svgmin = require('gulp-svgmin');
    var path = require('path');
    var notify        = require('gulp-notify');

    var svgspriteConfig = config.tasks.svgsprite;
    
    return gulp.src(svgspriteConfig.source, {cwd: config.sourceRoot})
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(config.destinationRoot + svgspriteConfig.destination))
        .pipe(notify('Successfully created SVG Sprite'));
};