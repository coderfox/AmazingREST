/// <reference path="./references.d.ts" />

// require
import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
var config = require('config');
var _log = require('log');
global['log'] = new _log(config.get('server.log'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// allow remote requests
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', '*');
  res.header('Access-Control-Allow-Origin', req.headers['origin']);
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
    res.status(err['status'] || 500).json(err);
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
