var fs = require('fs');
var ncp = require('ncp').ncp;

//Where "src" folder is and have to be place
var copyyFileList =
    [
        {
            input: 'postinstall/gulpfile.js',
            output: '../../gulpfile.js'
        },
        {
            input: 'postinstall/gulp-config.js',
            output: '../../gulp-config.js'
        },
        {
            input: 'postinstall/.editorconfig',
            output: '../../.editorconfig'
        },
        {
            input: 'postinstall/.eslintrc.json',
            output: '../../.eslintrc.json'
        },
        {
            input: 'postinstall/.sass-lint.yml',
            output: '../../.sass-lint.yml'
        },
        {
            input: 'postinstall/.lesshintrc',
            output: '../../.lesshintrc'
        }
    ];

// Where "src" folder is and have to be place
var assetsInput = 'postinstall/src';
var assetsOutput = '../../src';

function fsExistsSync(myDir) {
    try {
        fs.accessSync(myDir);
        return true;
    } catch (e) {
        return false;
    }
}

// Copy some unitary files
for(var file of copyyFileList) {
    if (!fsExistsSync(file.output)) {
        fs.createReadStream(file.input).pipe(fs.createWriteStream(file.output));
    } 
}

// Copy source folder in project if not exists yet
if (!fsExistsSync(assetsOutput)) {
    ncp.limit = 16;
    ncp(assetsInput, assetsOutput, {
        filter: /^(?:(?!\.gitkeep).)*$/
    }, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}