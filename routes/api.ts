/// <reference path="../references.d.ts"/>

import express = require('express');
import config = require('config');
import mongodb = require('mongodb');
import Promise = require('bluebird');
var console = process['console'];

var router = express.Router();

// GET /:collection
router.get('/:collection', function(req, res, next) {
  var collection = <mongodb.CollectionAsync>Promise.promisifyAll(MongoDatabase.collection(req.params['collection']));
  collection.findAsync().then((cur) => {
    var limit = (Number)(req.header('X-Limit')) || 20;
    var page = (Number)(req.header('X-Page')) || 1;
    var cursor = <mongodb.CursorAsync>Promise.promisifyAll(cur.skip((page - 1) * limit).limit(limit));
    return cursor.toArrayAsync();
  }).then((docs) => {
    res.json(docs);
  }).catch((err) => {
    console.tag('server').time().error('An error occured when querying.').error(err.message);
    next(err);
  });
});
// POST /:collection
router.post('/:collection', function(req, res, next) {
  var doc = req.body;
  var collection = <mongodb.CollectionAsync>Promise.promisifyAll(MongoDatabase.collection(req.params['collection']));
  collection.insertOneAsync(doc).done((result) => {
    res.json(doc);
  }, (err) => {
      console.tag('server').time().error('An error occured when querying.').error(err.message);
      next(err);
    });
});
// GET /:collection/:id
router.get('/:collection/:id', function(req, res, next) {
  var collection = <mongodb.CollectionAsync>Promise.promisifyAll(MongoDatabase.collection(req.params['collection']));
  collection.findOneAsync({ "_id": new mongodb.ObjectID(req.params['id']) }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    console.tag('server').time().error('An error occured when querying.').error(err.message);
    next(err);
  });
});
// PUT /:collection/:id
router.put('/:collection/:id', function(req, res, next) {
  var collection = <mongodb.CollectionAsync>Promise.promisifyAll(MongoDatabase.collection(req.params['collection']));
  collection.findOneAndUpdateAsync({ "_id": new mongodb.ObjectID(req.params['id']) }, req.body).then((doc) => {
    if (doc.value) {
      res.json(doc);
    } else {
      throw new Error('Document not existing!');
    }
  }).catch((err) => {
    console.tag('server').time().error('An error occured when querying.').error(err.message);
    next(err);
  });
});
// DEELTE /:collection/:id
router.delete('/:collection/:id', function(req, res, next) {
  var collection = <mongodb.CollectionAsync>Promise.promisifyAll(MongoDatabase.collection(req.params['collection']));
  collection.findOneAndDeleteAsync({ "_id": new mongodb.ObjectID(req.params['id']) }).then((doc) => {
    if (doc.value) {
      res.json(doc);
    } else {
      throw new Error('Document not existing!');
    }
  }).catch((err) => {
    console.tag('server').time().error('An error occured when querying.').error(err.message);
    next(err);
  });
});

export = router;
