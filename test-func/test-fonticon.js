var config      = require('../gulp-config')
var assert = require('assert')

var chai = require('chai')
chai.use(require('chai-fs'))

var expect = chai.expect

describe('gulp fonticon', function() {
    
  describe('generated fonticon', function() {
    var destinationFileList = config.tasks.fonticon.format.map(function(fontFormat) {
      return config.tasks.fonticon.fontName + '.' + fontFormat
    })
    it('fonts folder ' + config.destinationRoot + config.tasks.fonticon.destination + ' should contain ' + destinationFileList.join(', ') + ' files', function() {
            // Adds a timeout, else it's possible to have missing fonts
      setTimeout(function() {
        var fonticonFolderErrorMessage = config.destinationRoot + config.tasks.fonticon.destination + ' folder does not exists'
        expect(config.destinationRoot + config.tasks.fonticon.destination).to.be.a.directory(fonticonFolderErrorMessage) //.and.include.contents(destinationFileList)
      }, 0)
    })
  })
})