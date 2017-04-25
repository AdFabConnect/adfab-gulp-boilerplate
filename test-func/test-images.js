var config      = require('../gulp-config')
var assert = require('assert')

var chai = require('chai')
chai.use(require('chai-fs'))

var expect = chai.expect

setTimeout(function() {
  describe('gulp images', function() {
    describe('copied image', function() {
      it('image folder ' + config.destinationRoot + config.tasks.images.destination + ' should contain logo-adfab.jpg and logo-adfab.png files', function() {
        var imageFolderErrorMessage = config.destinationRoot + config.tasks.images.destination + ' folder does not exists'
        expect(config.destinationRoot + config.tasks.images.destination).to.be.a.directory(imageFolderErrorMessage).with.contents(['logo-adfab.jpg', 'logo-adfab.png'])
      })
    })
  })
}, 0)