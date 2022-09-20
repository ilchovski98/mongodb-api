const express = require('express');
const helmet = require('helmet');
const error = require('../middlewares/error');
const tweets = require('../routes/tweets');
const dogs = require('../routes/dogs');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function(app) {
  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(helmet());

  // create out routes
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  // Routes
  app.use('/api/tweets', tweets);
  app.use('/api/dogs', dogs);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}
