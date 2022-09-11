const express = require('express');
const { connectToDatabase } = require('./db/db');
const tweets = require('./routes/tweets');
const helmet = require('helmet');
require('dotenv').config();

// configure out app
const app = express();
const port  = process.env.PORT || 3000;

// connect to our mongodb database
connectToDatabase();

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

// create the server
app.listen(port, () => {
  console.log('Our app is running on port ', port);
})
