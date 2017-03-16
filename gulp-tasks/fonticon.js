module.exports = function() {
    var config        = require('../../../gulp-config');
    var gulp          = require('gulp');
    var plumber       = require('gulp-plumber');
    var notify        = require('gulp-notify');
    var iconfont = require('gulp-iconfont');
    var iconfontCss = require('gulp-iconfont-css');

    var fonticonConfig = config.tasks.fonticon;
    
    return gulp.src(fonticonConfig.source, {cws: config.sourceRoot})
      .pipe(plumber({errorHandler: notify.onError({
          message: "<%= error.message %>",
          title: "Views Error"
      })}))
      .pipe(iconfontCss({
        fontName: fonticonConfig.fontName,
        path: fonticonConfig.fileType,
        targetPath: fonticonConfig.fileName,
        fontPath: fonticonConfig.fontPath
      }))
      .pipe(iconfont({
        fontName: fonticonConfig.fontName,
        formats: fonticonConfig.format
      }))
      .pipe(gulp.dest(config.destinationRoot + fonticonConfig.destination))
      .pipe(notify({message: 'Successfully compiled SVG font icon', onLast: true}))
      .on('error', function() {
        this.emit("error", new Error("SVG font icon compilation Error"));
      });
};
