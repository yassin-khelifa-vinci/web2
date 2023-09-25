var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var filmRouter = require('./routes/films');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let reqCounter = {};

app.use((req, res, next) => {
    console.log('here')
    let method = req.method + ' ' + req.path;
    if (reqCounter[method] === undefined)
      reqCounter[method] = 1;
    else
    reqCounter[method] += 1;
    console.log('Request counter :\n', reqCounter)
    next();
  });

app.use('/films', filmRouter);
app.use('/users', usersRouter);

module.exports = app;
