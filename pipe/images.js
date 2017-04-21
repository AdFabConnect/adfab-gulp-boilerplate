const config        = require('../../../gulp-config');
const imagemin      = require('gulp-imagemin');

const imagesConfig = config.tasks.images;

module.exports = lazypipe()
    .pipe(imagemin)
;
