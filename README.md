# Adfab Gulp Boilerplate

[![NPM](https://nodei.co/npm/adfab-gulp-boilerplate.png?compact=true)](https://npmjs.org/package/adfab-gulp-boilerplate)

[![npm version](https://badge.fury.io/js/adfab-gulp-boilerplate.svg)](http://badge.fury.io/js/adfab-gulp-boilerplate)
[![Build Status](https://travis-ci.org/AdFabConnect/adfab-gulp-boilerplate.svg?branch=master)](https://travis-ci.org/AdFabConnect/adfab-gulp-boilerplate)
[![Dependency Status](https://david-dm.org/AdFabConnect/adfab-gulp-boilerplate.svg?theme=shields.io)](https://david-dm.org/AdFabConnect/adfab-gulp-boilerplate)
[![devDependency Status](https://david-dm.org/AdFabConnect/adfab-gulp-boilerplate/dev-status.svg?theme=shields.io)](https://david-dm.org/AdFabConnect/adfab-gulp-boilerplate#info=devDependencies)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://raw.githubusercontent.com/AdFabConnect/adfab-gulp-boilerplate/master/LICENSE)

The goal of this [Gulp](http://gulpjs.com/) boilerplate is to free you time so you can do something more interesting than reinventing the wheel, it includes:

* Automatic reloading of the browser on code modification (using [Browsersync](https://www.browsersync.io/))
* CSS / JS Sourcemaps
* HTML minification
* [Image minification](https://www.npmjs.com/package/gulp-imagemin)
* JS compilation
* [Babel](https://babeljs.io/) transpiler (ES6 support FTW)
* [SASS](http://sass-lang.com/) or [LESS](http://lesscss.org/) compilation
* Linting for [JS](https://www.npmjs.com/package/gulp-eslint), [SASS](https://www.npmjs.com/package/gulp-sass-lint) and [LESS](https://www.npmjs.com/package/gulp-lesshint)
* Desktop notifications on success and error
* [Fonticon](gulp-iconfont) generation
* [SVG Sprite](gulp-svgstore) generation
* Production mode: JS / CSS minification + sources maps removal

## Installation

```shell
npm install adfab-gulp-boilerplate
```

Upon installation, two files will be copied to the root of your project: `gulpfile.js` and `gulp-config.js`.

## Usage

### Configure the tasks you need

Every task rely on the `gulp-config.js` file for their configuration. Just fill-in the values you need.
* vhost: your local url,
* sourceRoot: root path where your assets will be stored
* destinationRoot: the path where your public final assets will be stored
* tasks: the list of all tasks you want to run. See details in `gulp-config.js` for details of every options of below for details about how it works 
 
### Task list

You can comment of remove the tasks you don't need. For exemple you will certainly need only one from less, sass and postcss.

Every tasks has a desktop notification when succeeded or failed, with detailed logs.

Here is a list of current taks available:
* sass: to compile scss into css file, with autoprefixer, sourcemaps for development, minify for production
* less: as sass, but for less
* sasslint: checks your sass code
* lesshint: checks your less code
* postcss: the same, but for postcss
* [fonticon](https://www.npmjs.com/package/gulp-iconfont): takes all svg files in a folder to create a fonticon and a [css/less/sass](https://www.npmjs.com/package/gulp-iconfont-css) file to be included in your final css
* jslibs: concatenates and uglify all your js libs into one single file
* scripts: parse your js with babelify for es6 compatibility. adds sourcemaps for dev, uglify for production
* eslint: checks your js code
* views: minify your html
* [images](https://www.npmjs.com/package/gulp-imagemin): optimizes image weight when copying
* fonts: juste copy your font files
* svgsprite: create a svg sprite from all svg in a folder

### Add custom task / Override task

You can create a folder named 'gulp-tasks' at the root of your project.
In this folder you can add new tasks. If a task has the same name as a default boilerplate task, it will override it.

### Tasks options

For every task you can add an option 'clean' to disable clean task for task destination folder before build:

```json
{
    "taskName": {
        "clean": false
    }
}
```

It can be useful if your destination folder already contains other files you want to keep, but your deleted files won't be removed anymore from destination.

### Browser live reloads

Start [Browsersync](https://www.browsersync.io/):

```shell
gulp serve
```

It acts as a proxy to the domain you specified in `gulp-config.js` (property `vhost`). You can now access your project by specifying the `3000` port (if you usually access your project via http://project.localhost/, now it would be http://project.localhost:3000/).

You can also test it in production mode by passing the `--production` option. That way, it will remove *sourcemaps* and minify JS and CSS.

### Development and production

Development mode (by default), adds sourcemaps to your code

You can run:
 
```shell
gulp --production
```

it will remove sourcemap genreration and minify your js and css.