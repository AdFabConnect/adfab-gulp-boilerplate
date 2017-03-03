const
    plumber   = require('gulp-plumber'),
    svgSprite = require('gulp-svg-sprite'),
    notify    = require('gulp-notify'),
    util      = require('gulp-util'),
    config    = util.env.config,
    gulp      = util.env.gulp
;

module.exports = function() {
    return gulp
        .src(config.svg.source)
        .pipe(plumber({errorHandler: notify.onError({
            message: '<%= error.message %>',
            title: 'SVG Error'
        })}))
        .pipe(svgSprite({
            shape: {
                dimension: { // Set maximum dimensions
                    maxWidth: 32,
                    maxHeight: 32
                }
            },
            mode : {
                symbol  : {
                    dest: './',
                    inline: true,
                    example: true
                }
            }
        }))
        .pipe(gulp.dest(config.svg.destination))
        .pipe(notify('Successfully compiled SVG'))
        .on('error', function() {
            this.emit('error', new Error('SVG compilation Error'));
        })
    ;
};
