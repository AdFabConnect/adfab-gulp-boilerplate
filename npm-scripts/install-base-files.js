'use strict';

{
    let fs = require('fs');

    // Add a symbolink link in the root directory
    // pointing to the gulpfile.js we provide

    let gulpfile = 'gulpfile.js';

    fs.symlink(gulpfile, '../../' + gulpfile);

    // Copy the .editorconfig file to the root directory if it doesn't
    // already exist so that it can be tuned afterward, if necessary

    let
        editorconfig = '.editorconfig',
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

    let ncp = require('ncp').ncp;

    // To quote ncp's README:
    // "The 'concurrency limit' is an integer that represents how many pending
    // file system requests ncp has at a time."

    ncp.limit = 16;

    ncp(
        'src',
        '../../src',
        {
            // Do not copy .gitkeep files
            filter: /^(?:(?!\.gitkeep).)*$/,
            // Do not overwrite files
            clobber: false
        }
    );
}