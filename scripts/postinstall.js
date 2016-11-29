var fs = require('fs'),
    outputGulpFile = '../../gulpfiles.js',
    outputGulpConfig = '../../gulp-config.js';

function fsExistsSync(myDir) {
    try {
        fs.accessSync(myDir);
        return true;
    } catch (e) {
        return false;
    }
}
if (!fsExists(outputGulpFile)) {
    fs.createReadStream('gulpfile.js').pipe(fs.createWriteStream(outputGulpFile));
}

if (!fsExists(outputGulpConfig)) {
    fs.createReadStream('gulp-config.js').pipe(fs.createWriteStream(outputGulpConfig));
}