module.exports = function() {
    const gulp = require('gulp');
    const plumber = require('gulp-plumber');
    const notify = require('gulp-notify');
    const iconfont = require('gulp-iconfont');
    const iconfontCss = require('gulp-iconfont-css');
    const util = require('gulp-util');
    const runSequence = require('run-sequence');

    const config = util.env.boilerplate.config;
    const fonticonConfig = config.tasks.fonticon;

    return gulp.src(fonticonConfig.source, {cwd: config.sourceRoot, base: './'})
      .pipe(plumber({errorHandler: notify.onError({
          message: '<%= error.message %>',
          title: 'Views Error'
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
          timestamp: fonticonConfig.timestamp
      }))
      .pipe(gulp.dest(config.sourceRoot + fonticonConfig.destination))
      .on('end', function() {
          if(fonticonConfig.hasOwnProperty('runafter')) {
              runSequence(fonticonConfig.runafter);
          }
      })
      .pipe(notify({message: 'Successfully compiled SVG font icon', onLast: true}))
      .on('error', function() {
          this.emit('error', new Error('SVG font icon compilation Error'));
      });
};
