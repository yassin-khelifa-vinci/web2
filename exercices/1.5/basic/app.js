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

app.use('/films', filmRouter);
app.use('/users', usersRouter);

module.exports = app;
