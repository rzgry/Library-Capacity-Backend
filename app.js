const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const librariesRouter = require('./routes/libraries');

const app = express();

// https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/libraries', librariesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // if err message is safe to expose to client
  // or we are running in development mode
  if (err.expose === true || process.env.NODE_ENV === 'development') {
    res.status(err.status || 500).send(err);
  } else {
    res.status(500).send(createError.InternalServerError());
  }
});

module.exports = app;
