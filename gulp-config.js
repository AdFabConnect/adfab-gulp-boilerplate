module.exports = {
    // Your local url
    vhost: 'gulp-boilerplate.local',
    sourceRoot: './src/assets/', // Source folder where your assets are
    destinationRoot: './public/', // Destination folder for your assets (./public/, ./web/..)

    tasks: {
        // https://www.npmjs.com/package/gulp-iconfont
        // https://www.npmjs.com/package/gulp-iconfont-css
        // Keeps this task before css (sass, less...) to get compiled file before
        fonticon: {
            source: [ 'icons/*.svg' ],
            destination: 'fonts/',
            fileType: 'scss', // css, less or scss
            fileName: './../../../../src/assets/sass/common/_fonticon.scss', // The generated file, you can put it in your src/ folder. Path is from gulp script location
            fontName: 'fonticon', // The name of the generated @font-face
            fontPath: 'fonts/', // The path where font is found related to your final css file in generated folder
            format: ['ttf', 'eot', 'woff', 'woff2', 'svg']
        },

        // Compiles SASS
        sass: {
            source: [ 'sass/**/*.scss' ], // The files you are compiling
            destination: 'css/', // Name of the folder where put css file in asset folder.
            browsers: ['last 2 versions'], // Browser list to support for autoprefixer examples: ['last 2 versions', 'ie 9', 'iOS >= 7']
            config: { // Specific sass config
                includePaths : []
            }
        },

        // Compiles LESS
        less: {
            source: [ 'less/style.less' ], // The files you are compiling
            watch: [ 'less/**/*.less' ], // The files you are watching
            destination: 'css', // Name of the folder where put css files
            browsers: ['last 2 versions'], // Browser list to support for autoprefixer examples: ['last 2 versions', 'ie 9', 'iOS >= 7']
        },

        // Compiles Post CSS
        postcss: {
            source: [ 'pcss/**/*.pcss' ], // The files you are compiling
            destination: 'css', // Name of the folder where put css file in asset folder.
            destinationFile: 'app.css', // Destination file name
            config: {
                bem: {
                    style: 'bem'
                },
                next: {
                    browsers: 'last 5 versions, ie >= 9'
                }
            }
        },

        // Concats all js libs in one unique file (you can add libs from node_modules here)
        jslibs: {
            source: [ 'libs/**/*.js' ], // The files you are compiling
            destination: 'scripts', // The files you are watching
            destinationFile: 'lib.js', // Destination file name (babel bundles accepts only one file for now)
        },

        // Compiles all scripts in a single file. Parsed with Babel for ES 6
        scripts: {
            source: [ 'scripts/app.js' ], // The files you are compiling
            destination: 'scripts', // Name of the folder where put script files
            destinationFile: 'app.js', // Destination file name (babel bundles accepts only one file for now)
            babelPresets: 'es2015' // Preset used with Babel
        },

        eslint: {
            source: [ 'scripts/**/*.js' ],
            config: {
                globals: [], // global vars of your project (like ['$', 'jQuery'] for projects using jQuery)
            }
        },

        // Copy templates files. Minify html during process
        views: {
            source: [ 'views/**/*.html', 'views/**/*.php' ], // The files you are compiling
            destination: './public',  // Name of the folder where put view files
            minifyHTML: true // If HTML in destination file has to be minified. Don't work with PHP code
        },

        // Copy images. They are optimized with imagemin during copy
        images: {
            source: [ 'images/**/*' ], // The files you are compiling
            destination: 'images',  // Name of the folder where put images files
        },

        // Copy fonts from source to destination
        fonts: {
            source: [ 'fonts/**/*' ], // The files you are compiling
            destination: 'fonts',  // Name of the folder where put fonts files
        },

        // Creates a svgsprite .svg from a list of svg files
        svgsprite: {
            source: [ 'svg/*.svg' ], // The files you are compiling. Name of the file is parent folder name, if source is svg/foo/*.svg, file will be foo.svg  
            destination: 'images'  // Name of the folder where put svgsprite
        }
    }
};