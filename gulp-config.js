module.exports = {
    vhost: 'gulp-boilerplate.local',

	source: {
        lessWatchFileList: [ './src/assets/less/**/*.less' ],
        lessCompileFileList: [ './src/assets/less/style.less' ],
        sassWatchFileList: [ './src/assets/sass/**/*.scss' ],
        sassCompileFileList: [ './src/assets/sass/**/*.scss' ],
        libFileList: [ './src/assets/scripts/lib/*.js' ],
        jsEntryFile: [ './src/assets/scripts/app.js' ],
        imageFileList: [ './src/assets/images/**/*' ],
        viewFileList: [ './src/assets/views/**/*.html' ],
        fontFileList: [ './src/assets/fonts/**/*' ],
        fontIconFileList: [ './src/assets/icons/*.svg'],
	},

	destination: {
	    assetsFolder: './www/', // General assets destination path. 
	    cssFolderName: 'css', // Name of the folder where put css file in asset folder.
	    cssFileName: 'style.css',
        libFolderName: 'scripts',
        libFileName: 'lib.js',
        jsFolderName: 'scripts',
        jsFileName: 'app.js',
        imagesFolderName: 'images',
	    viewsFolderName: '',
        fontsFolderName: 'fonts',
        fontIconFontName: 'fonticon',
        fontIconFontFolderFile: './src/assets/fonts/',
        fontIconLessFile: '../less/common/_fonticon.less'
	}
};
