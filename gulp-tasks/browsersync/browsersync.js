const
    browserSync = require('browser-sync'),
    util        = require('gulp-util'),
    config      = util.env.config
;

module.exports = function() {
    return browserSync.init({
        proxy: config.browsersync.domain
    });
};