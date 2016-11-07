# Adfab Gulp Boilerplate

The goal of this boilerplate is to free you time so you can do something more interesting than reinventing the wheel, it includes:

* Automatic reloading of the browser on code modification (using [Browsersync](https://www.browsersync.io/))
* CSS / JS Sourcemaps
* HTML minification
* JS compilation
* BABEL transpiler (ES6 support FTW)
* SASS or LESS compilation
* Notifications on success and error
* Fonticon generation
* Production mode : JS / CSS minification + sources maps removal

## Installation

```shell
npm install git+ssh://git@github.com:AdFabConnect/adfab-gulp-boilerplate.git
```

Upon installation, two files will be copied to the root of your project: `gulpfile.js` and `gulp-config.js`.

## Configuration

### Enable the tasks you need

Every task of the boilerplate is commented out by default. This means that to add, for example, SASS compilation to your project you got to:

 * de-comment the `gulp.task('sass', …` line,
 * de-comment the affected folders paths in the `clean` task (in our example, the `config.destination.assetsFolder + config.destination.cssFolderName` line),
 * de-comment the `sass` task in the `build` task,
 * de-comment the `gulp.watch(config.source.sassWatchFileList, ['sass']);` line in the `watch` task.

…don't worry, that'll be automatized in version 2. ;)

### Configure the tasks

Every tasks rely on the `gulp-config.js` file for their configuration. Just fill-in the values you need.

## Utilization

### Browsersync

Start Browsersync by launching:

```shell
gulp serve
```

It acts as a proxy to the domain you specified in `gulp-config.js` (property `vhost`). You can now access your project by specifying the `3000` port (if you usually access your project via http://project.localhost/, now it would be http://project.localhost:3000/).

You can also test it in production mode by passing the `--production` option. That way, it will remove *sourcemaps* and minify JS and CSS.
