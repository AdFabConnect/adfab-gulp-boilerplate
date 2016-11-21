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

Just check `gulpfile.js` out de-comment what you need and comment out what you don't.

### Configure the tasks

Every task rely on the `gulp-config.js` file for their configuration. Just fill-in the values you need.

## Utilization

### Browsersync

Start Browsersync by launching:

```shell
gulp serve
```

It acts as a proxy to the domain you specified in `gulp-config.js` (property `vhost`). You can now access your project by specifying the `3000` port (if you usually access your project via http://project.localhost/, now it would be http://project.localhost:3000/).

You can also test it in production mode by passing the `--production` option. That way, it will remove *sourcemaps* and minify JS and CSS.

## Contribution

You're free to contribute to the boilerplate and log the time you spent improving it using [its Jira project](https://support.adfab.fr/secure/RapidBoard.jspa?rapidView=562&projectKey=BOILERPLATE&view=detail) at only one condition: because the project is used via NPM (and because it's a good practice, after all) you got to use the tagging system.

### Tagging

The tagging system is quite simple:

 1. Increment the major version when finishing a sprint
 2. Increment the minor version when adding a feature
 3. Increment the patch version when fixing a bug or doing a small change

You **must** use this system for **every commit** because projects have to rely on stable versions of the boilerplate, example:

```bash
git tag v0.9.2
git push origin --tags
```