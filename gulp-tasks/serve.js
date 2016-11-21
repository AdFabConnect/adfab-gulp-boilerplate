var config = require('../../../gulp-config');
var browserSync  = require('browser-sync');

module.exports = function() {
  return browserSync.init({
      proxy: config.vhost
  });
};