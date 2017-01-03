# Adfab Gulp Boilerplate

The goal of this [Gulp](http://gulpjs.com/) boilerplate is to free you time so you can do something more interesting than reinventing the wheel, it includes:

* Automatic reloading of the browser on code modification (using [Browsersync](https://www.browsersync.io/))
* CSS / JS Sourcemaps
* HTML minification
* JS compilation
* [Babel](https://babeljs.io/) transpiler (ES6 support FTW)
* [SASS](http://sass-lang.com/) or [LESS](http://lesscss.org/) compilation
* Notifications on success and error
* Fonticon generation
* Production mode: JS / CSS minification + sources maps removal

## Installation

```shell
npm install git+ssh://git@github.com:AdFabConnect/adfab-gulp-boilerplate.git#v0.9.2
```

Upon installation, two files will be copied to the root of your project: `gulpfile.js` and `gulp-config.js`.

## Usage

### Enable the tasks you need

Just check `gulpfile.js` out de-comment what you need and comment out what you don't.

### Configure the tasks

Every task rely on the `gulp-config.js` file for their configuration. Just fill-in the values you need.

### Browser live reloads

Start [Browsersync](https://www.browsersync.io/):

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
git tag v0.9.3
git push origin --tags
```

## License

Copyright 2016 ADFAB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
