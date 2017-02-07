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
        fontIconFileList: [ './src/assets/icons/*.svg'],
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
        fontsFolderName: 'fonts',
        fontIconFontName: 'fonticon',
        fontIconType: 'scss', // css, less or scss
        fontIconFolderName: './src/assets/fonts/',
        fontIconFontPath: 'fonts/',
        fontIconFileName: '../less/common/_fonticon.less'
    }
};
