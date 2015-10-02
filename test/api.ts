/// <reference path="../references.d.ts"/>

import http = require('http');
import Promise = require('bluebird');
import chai = require('chai');
var expect = chai.expect;
var requestAsync: Function = Promise.promisify(require('request'));

describe('api', function() {
  describe('Insert', function() {
    before(function() {
      require('../bin/www');
    });
    it('Should be able to insert an object.', (done) => {
      requestAsync({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/hi',
        json: true,
        body: {
          foo: 'bar',
          unit: 'test'
        }
      }).spread((response: http.IncomingMessage, body: any) => {
        chai.expect(response.statusCode).to.eql(201, 'HTTP response code should be 201.');
        chai.expect(response.headers.location).to.eql('/api/hi/' + body._id, 'HTTP response header "Location" should be pointing to resource.');
      }).done(done, done);
    });
  });
});
