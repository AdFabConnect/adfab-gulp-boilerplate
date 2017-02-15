'use strict';

{
    const fs = require('fs');

    // Copy the .editorconfig file to the root directory if it doesn't
    // already exist so that it can be tuned afterward, if necessary

    const
        editorconfig     = '.editorconfig',
        rootEditorconfig = '../../' + editorconfig
    ;

    try {
        fs.accessSync(rootEditorconfig);
    } catch (e) {
        fs.createReadStream(editorconfig).pipe(
            fs.createWriteStream(rootEditorconfig)
        );
    }

    // Copy a base file structure to kickstart a project event faster

    const
        sources     = 'src',
        rootSources = '../../' + sources
    ;

    try {
        fs.accessSync(rootSources);
    } catch (e) {
        const ncp = require('ncp').ncp;

        // To quote ncp's README:
        // "The 'concurrency limit' is an integer that represents how many
        // pending file system requests ncp has at a time."

        ncp.limit = 16;

        ncp(
            sources,
            rootSources,
            {
                // Do not copy .gitkeep files
                filter: /^(?:(?!\.gitkeep).)*$/,
                // Do not overwrite files
                clobber: false
            },
            () => {}
        );
    }

    // Add a symbolink link in the root directory
    // pointing to the gulpfile.js we provide

    // I just discovered you can't create a symlink in a parent directory
    process.chdir('../../');

    const gulpfile = 'gulpfile.js';

    fs.symlink('node_modules/adfab-gulp-boilerplate/' + gulpfile, gulpfile, () => {});
}