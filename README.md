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
npm i adfab-gulp-boilerplate
```

Just after installation, you will be asked a few questions to configure the boilerplate to suit your needs.

After you answered every question three objects will be copied to the root of your project:

* A `boilerplate-config.json` file containing every answer you made
* A `.editorconfig` file that you can configure to better suit your rules
* A `gulpfile.js` which is a symbolic link to the file the boilerplate provides

## Usage

```shell
gulp watch
```

### Browser live reloads

Start [Browsersync](https://www.browsersync.io/):

```shell
gulp serve
```

It acts as a proxy to the domain you specified just after installation. You can now access your project by specifying the `3000` port (if you usually access your project via http://project.localhost/, now it would be http://project.localhost:3000/).

You can also test it in production mode by passing the `--production` option. That way, it will remove *sourcemaps* and minify JS and CSS.

## ISC License

Copyright 2017 Adfab

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
