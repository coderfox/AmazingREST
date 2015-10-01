/// <reference path="../references.d.ts"/>

import Q = require('q');
import request = require('request');
import http = require('http');

export var Request = request;
export var get = (url: string, options?: request.Options): Q.Promise<Array<any>> => {
  var deferred = Q.defer<Array<any>>();
  request.get(url, options, (err, res, body) => {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve([res, body]);
    }
  });
  return deferred.promise;
};
export var post = (url: string, options?: request.Options): Q.Promise<Array<any>> => {
  var deferred = Q.defer<Array<any>>();
  request.post(url, options, (err, res, body) => {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve([res, body]);
    }
  });
  return deferred.promise;
};
export var put = (url: string, options?: request.Options): Q.Promise<Array<any>> => {
  var deferred = Q.defer<Array<any>>();
  request.put(url, options, (err, res, body) => {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve([res, body]);
    }
  });
  return deferred.promise;
};
