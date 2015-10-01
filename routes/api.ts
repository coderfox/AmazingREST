/// <reference path="../references.d.ts"/>

import express = require('express');
import config = require('config');
import mongodb = require('mongodb');
import Promise = require('bluebird');
var MongoClient = <mongodb.MongoClientAsync>Promise.promisifyAll(require('mongodb').MongoClient);
var console = process['console'];

var router = express.Router();

// GET /:collection
router.get('/:collection', function(req, res, next) {
  MongoClient.connectAsync(config.get<string>('db.uri')).then((db) => {
    console.tag('server').time().info('Connected correctly to database');
    var collection = <mongodb.CollectionAsync>Promise.promisifyAll(db.collection(req.param('collection')));
    return collection.findAsync();
  }).then((cur) => {
    var limit = (Number)(req.header('X-Limit')) || 20;
    var page = (Number)(req.header('X-Page')) || 1;
    var cursor = <mongodb.CursorAsync>Promise.promisifyAll(cur.skip((page - 1) * limit).limit(limit));
    return cursor.toArrayAsync();
  }).then((docs) => {
    var result = docs || [];
    res.json(docs);
  }).catch((err) => {
    console.tag('server').time().error('An error occured when querying.').error(err);
    next(err);
  });
});
// PUT /:collection
// GET /:collection/:id

export = router;
