const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');
const util = require('gulp-util');

const config = util.env.boilerplate.config;
const imagesConfig = config.tasks.images;

module.exports = lazypipe()
    .pipe(function() {
        return gulpIf(imagesConfig.minify, imagemin())
    } 
;
