var fs = require('fs'),
    outputGulpFile = '../../gulpfile.js',
    outputGulpConfig = '../../gulp-config.js';

function fsExistsSync(myDir) {
    try {
        fs.accessSync(myDir);
        return true;
    } catch (e) {
        return false;
    }
}
if (!fsExistsSync(outputGulpFile)) {
    fs.createReadStream('gulpfile.js').pipe(fs.createWriteStream(outputGulpFile));
}

if (!fsExistsSync(outputGulpConfig)) {
    fs.createReadStream('gulp-config.js').pipe(fs.createWriteStream(outputGulpConfig));
}
