const imagemin = require('gulp-imagemin');
const util = require('gulp-util');

const config = util.env.boilerplate.config;
const imagesConfig = config.tasks.images;

module.exports = lazypipe()
    .pipe(imagemin)
;
