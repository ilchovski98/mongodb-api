const express = require('express');
require('dotenv').config();

// Configure out app
const app = express();
const port  = process.env.PORT || 8000;

require('./startup/db')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/prod')(app);

// Create the server
app.listen(port, () => {
  console.log('Our app is running on port ', port);
})
