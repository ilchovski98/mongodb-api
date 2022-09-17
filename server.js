const express = require('express');
require('./db/db');
const tweets = require('./routes/tweets');
const dogs = require('./routes/dogs');
const users = require('./routes/users');
const auth = require('./routes/auth');
const helmet = require('helmet');
require('dotenv').config();

if (!process.env.JWTPRIVATEKEY) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// configure out app
const app = express();
const port  = process.env.PORT || 8000;

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

// create the server
app.listen(port, () => {
  console.log('Our app is running on port ', port);
})
