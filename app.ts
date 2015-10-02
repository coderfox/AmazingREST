/// <reference path="./references.d.ts" />

// require
import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import config = require('config');
import mongodb = require('mongodb');
import Promise = require('bluebird');
var MongoClient = <mongodb.MongoClientAsync>Promise.promisifyAll(require('mongodb').MongoClient);
var console = process['console'];
global['MongoDatabase'] = null;

var app = express();

// database
MongoClient.connectAsync(config.get<string>('db.uri')).then((db) => {
  MongoDatabase = db;
  console.tag('server').time().info('Connected correctly to database');
}).catch((err) => {
  console.tag('server').time().error('An error occured when connecting to database.').error(err);
  process.exit(1);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (process.env.NODE_ENV !== 'test') {
  app.use(scribe.express.logger());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// allow remote requests
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', '*');
  res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// routes
import routes = require('./routes/index');
app.use('/', routes);
//catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use('/api', (err: any, req: express.Request, res: express.Response, next: Function) => {
    res.status(err['status'] || 500).json({
      message: err.message,
      error: err
    });
  });
  app.use((err: any, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use('/api', (err: any, req: express.Request, res: express.Response, next: Function) => {
  res.status(err['status'] || 500).json({
    message: err.message,
    error: {}
  });
});
app.use((err: any, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//export
export = app;
