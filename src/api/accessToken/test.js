var assert = require('assert');
var index = require('./index');
describe('accessToken', function() {
  describe('getToken', function() {
    it('getToken', function(done) {
      index.getToken("").then(o => {
        done();
      }).catch(function(e) {
        done(e);
      });
    });
  });
});

