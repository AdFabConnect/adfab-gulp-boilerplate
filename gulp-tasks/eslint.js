module.exports = function() {
    var config  = require('../../../gulp-config');
    var gulp    = require('gulp');
    var eslint  = require('gulp-eslint');
    var notify        = require('gulp-notify');

    var eslintConfig = config.tasks.eslint;

    return gulp
        .src(eslintConfig.source, {cwd: config.sourceRoot })
        .pipe(eslint(eslintConfig.config || {}))
        .pipe(eslint.format())
        .pipe(notify({message: 'Successfully lint JS', onLast: true }))
};
