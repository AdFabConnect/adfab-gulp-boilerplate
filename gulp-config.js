module.exports = {
    // Your local url
    vhost: 'gulp-boilerplate.local',

    tasks: {
        // https://www.npmjs.com/package/gulp-iconfont
        // https://www.npmjs.com/package/gulp-iconfont-css
        // Keeps this task before css (sass, less...) to get compiled file before
        fonticon: {
            entryFileList: [ './src/assets/icons/*.svg' ],
            watchFileList: [ './src/assets/icons/*.svg' ],
            fileType: 'scss', // css, less or scss
            fileName: './../../../../src/assets/sass/common/_fonticon.scss', // The generated file, you can put it in your src/ folder. Path is from gulp script location
            fontName: 'fonticon', // The name of the generated @font-face
            fontPath: 'fonts/', // The path where font is found related to your final css file in generated folder
            destinationFolder: './public/fonts/',
            format: ['ttf', 'eot', 'woff', 'woff2', 'svg']
        },
        
        // Compiles SASS
        sass: {
            compileFileList: [ './src/assets/sass/**/*.scss' ], // The files you are compiling
            watchFileList: [ './src/assets/sass/**/*.scss' ], // The files you are watching
            destinationFolder: './public/css', // Name of the folder where put css file in asset folder.
            browsers: ['last 2 versions', 'ie 9', 'iOS >= 7'], // Browser list to support for autoprefixer
            config: { // Specific sass config
                includePaths : []
            }
        },

        // Compiles LESS
        less: {
            compileFileList: [ './src/assets/less/style.less' ], // The files you are compiling
            watchFileList: [ './src/assets/less/**/*.less' ], // The files you are watching
            browsers: ['last 2 versions', 'ie 9', 'iOS >= 7'], // Browser list to support for autoprefixer
            destinationFolder: './public/css', // Name of the folder where put css files
        },

        // Compiles Post CSS
        postcss: {
            compileFileList: [ './src/assets/pcss/**/*.pcss' ], // The files you are compiling
            watchFileList: [ './src/assets/pcss/**/*.pcss' ], // The files you are watching
            destinationFolder: './public/css', // Name of the folder where put css file in asset folder.
            destinationFileName: 'app.js', // Destination file name
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
            compileFileList: [ './src/assets/libs/**/*.js' ], // The files you are compiling
            watchFileList: [ './src/assets/libs/**/*.js' ], // The files you are watching
            destinationFolder: './public/scripts', // The files you are watching
            destinationFileName: 'lib.js', // Destination file name (babel bundles accepts only one file for now)
        },

        // Compiles all scripts in a single file. Parsed with Babel for ES 6
        scripts: {
            compileFileList: [ './src/assets/scripts/app.js' ], // The files you are compiling
            watchFileList: [ './src/assets/scripts/**/*.js' ], // The files you are watching
            destinationFolder: './public/scripts', // Name of the folder where put script files
            destinationFileName: 'app.js', // Destination file name (babel bundles accepts only one file for now)
            babelPresets: 'es2015' // Preset used with Babel
        },

        // Copy templates files. Minify html during process
        views: {
            compileFileList: [ './src/assets/views/**/*.html', './src/assets/views/**/*.php' ], // The files you are compiling
            watchFileList: [ './src/assets/views/**/*.html', './src/assets/views/**/*.php' ], // The files you are watching
            destinationFolder: './public',  // Name of the folder where put view files
            minifyHTML: true // If HTML in destination file has to be minified. Don't work with PHP code
        },

        // Copy images. They are optimized with imagemin during copy
        images: {
            compileFileList: [ './src/assets/images/**/*' ], // The files you are compiling
            watchFileList: [ './src/assets/images/**/*' ], // The files you are watching
            destinationFolder: './public/images',  // Name of the folder where put view files
        },
        
        // Copy fonts from source to destination
        fonts: {
            compileFileList: [ './src/assets/fonts/**/*' ], // The files you are compiling
            watchFileList: [ './src/assets/images/**/*' ], // The files you are watching
            destinationFolder: './public/images',  // Name of the folder where put view files
        }
    }
};
