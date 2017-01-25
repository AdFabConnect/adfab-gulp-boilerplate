var fs = require('fs');
var ncp = require('ncp').ncp;

//Where "src" folder is and have to be place
var copyyFileList =
[
    {
        input: 'gulpfile.js',
        output: '../../gulpfile.js'
    },
    {
        input: 'gulp-config.js',
        output: '../../gulp-config.js'
    },
    {
        input: '.editorconfig',
        output: '../../.editorconfig'
    }
];

// Where "src" folder is and have to be place
var assetsInput = 'src';
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
for(file of copyyFileList) {
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