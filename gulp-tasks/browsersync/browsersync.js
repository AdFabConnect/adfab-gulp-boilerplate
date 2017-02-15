const
	browserSync   = require('browser-sync'),
	util          = require('gulp-util'),
	configuration = util.env.config
;

module.exports = function() {
  return browserSync.init({
      proxy: configuration.browsersync.domain
  });
};