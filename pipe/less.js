const lazypipe     = require('lazypipe');
const less          = require('gulp-less');
const autoprefixer  = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const gulpif = require('gulp-if');
const util = require('gulp-util');

const config = util.env.boilerplate.config;
const lessConfig = config.tasks.less;

module.exports = lazypipe()
    .pipe(function() {
        return gulpif(!util.env.production, sourcemaps.init())
    })
    .pipe(less)
    .pipe(autoprefixer, { browsers: lessConfig.browsers })
    .pipe(function() {
        return gulpif(util.env.production, cleanCss())
    })
    .pipe(function() {
        return gulpif(!util.env.production, sourcemaps.write())
    });