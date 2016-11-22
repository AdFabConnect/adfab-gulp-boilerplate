var fs = require('fs');

fs.createReadStream('gulpfile.js').pipe(fs.createWriteStream('../../gulpfiles.js'));
fs.createReadStream('gulp-config.js').pipe(fs.createWriteStream('../../gulp-config.js'));