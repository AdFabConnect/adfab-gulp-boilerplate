module.exports = {
    vhost: 'gulp-boilerplate.local',
    
    tasks: {
        sass: {
            compileFileList: [ './src/assets/sass/**/*.scss' ], // The files you are compiling
            watchFileList: [ './src/assets/sass/**/*.scss' ], // The files you are watching
            destinationFolder: './public/css', // Name of the folder where put css file in asset folder.
            config: { // Specific sass config
                includePaths : []
            }
        },
        
        scripts: {
            entryFileList: [ './src/assets/scripts/app.js' ],
            watchFileList: [ './src/assets/scripts/**/*.js' ],
            destinationFolder: './public/scripts',
            destinationFileName: 'app.js',
            babelPresets: 'es2015'
        },
        
        // https://www.npmjs.com/package/gulp-iconfont
        // https://www.npmjs.com/package/gulp-iconfont-css
        fonticon: {
            entryFileList: [ './src/assets/icons/*.svg' ],
            watchFileList: [ './src/assets/icons/*.svg' ],
            fileType: 'scss', // css, less or scss
            fileName: './../../../../src/assets/sass/common/_fonticon.scss', // The generated file, you can put it in your src/ folder
            fontName: 'fonticon', // The name of the generated @fton-face
            fontPath: 'fonts/', // The path where font is found related to your final css file in generated folder
            destinationFolder: './public/fonts/',
            format: ['ttf', 'eot', 'woff', 'woff2', 'svg']
        }
    },

    source: {
        bootStrapSass: ['./node_modules/bootstrap-sass/'],
        bootStrapJsEntryFile: ['./node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js' ],
        postCSSWatchFileList: [ './src/assets/pcss/**/*.pcss' ],
        postCSSCompileFileList: [ './src/assets/pcss/**/*.pcss' ],
        lessWatchFileList: [ './src/assets/less/**/*.less' ],
        lessCompileFileList: [ './src/assets/less/style.less' ],
        libFileList: [ './src/assets/scripts/lib/*.js' ],
        imageFileList: [ './src/assets/images/**/*' ],
        viewFileList: [ './src/assets/views/**/*.html', './src/assets/views/**/*.json', './src/assets/views/**/*.php' ],
        fontFileList: [ './src/assets/fonts/**/*' ],
    },

    postCSSConfigs: {
        bem: {
            style: 'bem'
        },
        next: {
            browsers: 'last 5 versions, ie >= 9'
        }
    },

    minifyHTML: true,

    destination: {
        assetsFolder: './www/', // General assets destination path. 
        cssFolderName: 'css', // Name of the folder where put css file in asset folder.
        cssFileName: 'style.css',
        libFolderName: 'scripts',
        libFileName: 'lib.js',
        imagesFolderName: 'images',
        viewsFolderName: '',
        fontsFolderName: 'fonts'
    }
};
