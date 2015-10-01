/// <reference path="../references.d.ts"/>

import Promise = require('bluebird');
import chai = require('chai');
var expect = chai.expect;
var request: any = Promise.promisifyAll(require('request'));

describe('server', function() {
  describe('start', function() {
    before(function() {
      require('../bin/www');
    });
    it('Website should be on.', (done) => {
      request.getAsync('http://127.0.0.1:3000').then(() => { }).done(done, done);
    });
  });
});
