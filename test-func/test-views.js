var config      = require('../gulp-config')
var assert = require('assert')

var chai = require('chai')
chai.use(require('chai-fs'))

var expect = chai.expect

setTimeout(function() {
  describe('gulp views', function() {
    describe('copied views', function() {
      it('views folder ' + config.destinationRoot + config.tasks.views.destination + ' should contain index.html and text.html files', function() {
        var viewsFolderErrorMessage = config.destinationRoot + config.tasks.views.destination + ' folder does not exists'
        expect(config.destinationRoot + config.tasks.views.destination).to.be.a.directory(viewsFolderErrorMessage).with.contents(['index.html', 'test.html'])
      })
    })
  })
}, 0)