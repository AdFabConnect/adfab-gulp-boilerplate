const browserSync  = require('browser-sync');
const util = require('gulp-util');

const config = util.env.boilerplate.config;

module.exports = function() {
    return browserSync.init({
        proxy: config.vhost
    });
};