module.exports = function(configName) {
    const gulp          = require('gulp');
    const svgstore = require('gulp-svgstore');
    const svgmin = require('gulp-svgmin');
    const path = require('path');
    const notify        = require('gulp-notify');
    const util = require('gulp-util');
    
    const config = util.env.boilerplate.config;
    const svgspriteConfig = config.tasks[configName];
    
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
            };
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(config.destinationRoot + svgspriteConfig.destination))
        .pipe(notify('Successfully created SVG Sprite'));
};