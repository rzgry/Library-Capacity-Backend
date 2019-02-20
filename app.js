require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

const librariesRouter = require('./routes/libraries');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// TODO: Improve healthcheck logic
app.get('/healthcheck', (req, res) => {
  res.status(200).send({ health: 'okay' });
});

app.use('/libraries', librariesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any errors to the error handler
app.use(errorHandler);

mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  { useNewUrlParser: true },
);

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', () => console.log('MongDB connection error')).once('open', () => console.log('MongDB connected'));
module.exports = app;
