const config        = require('../../../gulp-config');
const gulp          = require('gulp');
const plumber       = require('gulp-plumber');
const svgSprite     = require('gulp-svg-sprite');
const notify        = require('gulp-notify');

module.exports = function() {
  return gulp.src(config.source.svgFileList)
    .pipe(plumber({errorHandler: notify.onError({
      message: "<%= error.message %>",
      title: "SVG Error"
    })}))
	.pipe(svgSprite({
		shape: {
			dimension: {			// Set maximum dimensions 
				maxWidth: 32,
				maxHeight: 32
			}
		},
		mode : {
			symbol	: {
				dest: './',
				inline: true,
				example: true
			}
		}
	}))
    .pipe(gulp.dest(config.destination.svgSprite))
    .pipe(notify('Successfully compiled SVG'))
    .on('error', function() {
      this.emit("error", new Error("SVG compilation Error"));
    });
};
