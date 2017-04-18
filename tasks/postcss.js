module.exports = function() {
    const config       = require('../../../gulp-config');
    const gulp         = require('gulp');
    const plumber      = require('gulp-plumber');
    const notify       = require('gulp-notify');
    const concat       = require('gulp-concat');
    const sourcemaps   = require('gulp-sourcemaps');
    const cleanCss     = require('gulp-clean-css');
    const gulpif       = require('gulp-if');
    const util         = require('gulp-util');
    const browserSync  = require('browser-sync');
    const postcss      = require('gulp-postcss');
    const Import       = require('postcss-import');
    const extend       = require('postcss-extend');
    const bem          = require('postcss-bem');
    const cssnext      = require('postcss-cssnext');

    var postcssConfig = config.tasks.postcss; 

    var processors = [
        Import,
        bem(postcssConfig.config.bem),
        extend,
        cssnext(postcssConfig.config.next)
    ];

    return gulp.src(postcssConfig.source, {cwd: config.sourceRoot})
        .pipe(plumber({
            errorHandler: notify.onError({
                message: "<%= error.message %>",
                title: "PCSS Error"
            })
        }))
        .pipe(gulpif(!util.env.production, sourcemaps.init()))
        .pipe(postcss(processors))
        .pipe(concat(postcssConfig.destinationFile))
        .pipe(gulpif(util.env.production, cleanCss()))
        .pipe(gulpif(!util.env.prodction, sourcemaps.write()))
        .pipe(gulp.dest(config.destinationRoot + postcssConfig.destination))
        .pipe(browserSync.stream())
        .pipe(notify('Successfully compiled postCSS'))
        .on('error', function() {
            this.emit("error", new Error("postCSS compilation Error"));
        });
};
