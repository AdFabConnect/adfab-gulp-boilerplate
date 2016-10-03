# Boilerplate Less Gulp

This boilerplate offers you 4hours of your lifetime to do something else instead of reinventing the wheel.

Thanks to it, your css/html/js updates in your projects will refresh automatically your browser view.

## Installation

To initialize the project, run:

```
npm install
```

Configure your local address to **myproject.local** on www folder

Sets your vhost to the compilation path:

```
<VirtualHost *:80>
DocumentRoot D:\programmation\wamp\www\myproject\www
ServerName **myproject.local**
</VirtualHost>
```

Updates your vhost:

```
127.0.0.1    **myproject.local**
```

## Run project

To run the project, run:

```
gulp serve
```

A local server will be created with browsersync

If you want to prepare you project for production, run:

## Options

```
gulp serve --production
```

This will remove sourcemaps and will minify JS and CSS

The whole configuration is included in gulp-config.js

## Included

* Browsersync
* CSS / JS Sourcemaps
* Views minification
* JS compilation
* BABEL transpiler
* SASS or LESS compilation
* Notifications on success and error
* Fonticon generation
* Production mode : js/css minification + sources maps removed
