/// <reference path="../references.d.ts"/>

import express = require('express');
var config = require('config');

var router = express.Router();

// GET /
router.get('/', function(req, res, next) {
  res.render('index', { title: "AmazingREST" });
});
// /api
router.use('/api', require('./api'));
// /logs
router.use('/log', scribe.webPanel());

export = router;
