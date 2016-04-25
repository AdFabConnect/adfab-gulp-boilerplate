## Installation

To initialize the project, run:

```
npm install
```

Configure your local address to **one-lci.local** on www folder
## Run project

To run the project, run:

```
gulp serve
```

A local server will be created with browsersync

If you want to check project like in production, run:

```
gulp serve --production
```

This will remove sourcemaps and will minify JS and CSS

## Inclus

* Browsersync
* Minification js/css en mode production
* Sourcemaps sauf en mode production
* Minification des vues
* Tout se gère dans le gulp-config.js pour les chemins d'entrée/sortie des fichiers