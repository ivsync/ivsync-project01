// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/db');
const deviceRouter = require('./src/controllers/device');
const baseRouter = require('./src/routes');

const config = require('./config');
const errorClasses = require('./src/utils/errors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Middleware for JSON responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Root API
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ivsync - Your Health Partner' });
});

app.use('/api/devices/', deviceRouter);
app.use('/api/', baseRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  if (config.NODE_ENV !== 'test') {
    config.logger.error(`
      Error caught at ${req.path}, 
      Request body: ${JSON.stringify(req.body)},
      Request User: ${JSON.stringify(req.user)},
      Request Params: ${JSON.stringify(req.params)}
      Request Query: ${JSON.stringify(req.query)}
      Error Message: ${JSON.stringify(err.message)}
      Error Logs: ${JSON.stringify(err.stack)}
  }`);
  }
  const isKnownError = Object.keys(errorClasses).some(
    (e) => err instanceof errorClasses[e],
  );
  if (!isKnownError) {
    // Wrap error in a generic error class then return response to user
    // eslint-disable-next-line no-param-reassign
    err = new errorClasses.GenericError(err.message, err);
  }
  console.log('Error is ', err.error);
  return res.status(err.statusCode).send(err.error);
});

process.on('unhandledRejection', (error) => {
  config.logger.error('FATAL UNEXPECTED UNHANDLED REJECTION!', error.message);
  throw error;
});
app.listen(port, async () => {
  await db.connect();
  config.logger.info(`Server is running on port ${port}`);
});
