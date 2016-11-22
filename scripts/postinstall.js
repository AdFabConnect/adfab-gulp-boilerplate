var fs = require('fs');

var fs = require('fs');fs.createReadStream('gulpfile.js').pipe(fs.createWriteStream('../../gulpfiles.js'));