/// <reference path="../references.d.ts"/>

import Q = require('q');
import chai = require('chai');
var expect = chai.expect;
import request = require('../lib/request');

describe('server', function() {
  describe('start', function() {
    before(function() {
      require('../bin/www');
    });
    it('Website should be on.', (done) => {
      request.get('http://127.0.0.1:3000').then(() => { }).done(done, done);
    });
  });
});
