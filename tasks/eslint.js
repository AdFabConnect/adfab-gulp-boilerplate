module.exports = function() {
    const gulp    = require('gulp');
    const eslint  = require('gulp-eslint');
    const notify        = require('gulp-notify');
    const util = require('gulp-util');
    
    const config = util.env.boilerplate.config;
    const eslintConfig = config.tasks.eslint;

    return gulp
        .src(eslintConfig.source, {cwd: config.sourceRoot })
        .pipe(eslint(eslintConfig.config || {}))
        .pipe(eslint.format());
};
