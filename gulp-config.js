module.exports = {
    vhost: 'myproject.local',

	source: {
	    cssFileList: [ './src/assets/less/**/*.less' ],
        libFileList: [ './src/assets/scripts/lib/*.js' ],
        jsEntryFile: [ './src/assets/scripts/app.js' ],
        imageFileList: [ './src/assets/images/**/*' ],
        viewFileList: [ './src/assets/**/*.html' ],
        fontFileList: [ './src/assets/fonts/**/*' ]
	},
	
	destination: {
	    assetsFolder: './dist/assets/', // General assets destination path. 
	    cssFolderName: 'css', // Name of the folder where put css file in asset folder.
	    cssFileName: 'app.css',
        libFolderName: 'scripts',
        libFileName: 'lib.js',
        jsFolderName: 'scripts',
        jsFileName: 'app.js',
        imagesFolderName: 'images',
	    viewsFolderName: '../',
        fontsFolderName: 'fonts',
	}
};
