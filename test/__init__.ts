/// <reference path="../references.d.ts"/>

import Promise = require('bluebird');
import chai = require('chai');
var expect = chai.expect;
var request: any = Promise.promisifyAll(require('request'));

describe('server', function() {
  describe('start', function() {
    it('server should be started.', function(done) {
      require('../bin/www');
      setTimeout(done, 1000);
    });
  });
});
