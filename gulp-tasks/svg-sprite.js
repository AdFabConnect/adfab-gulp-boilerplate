const config        = require('../../../gulp-config');
const gulp          = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var notify        = require('gulp-notify');

module.exports = function() {
    return gulp
        .src(config.source.svgSpriteFiles)
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
        .pipe(gulp.dest(config.destination.svgSpriteFolder))
        .pipe(notify('Successfully created SVG Sprite'));
};