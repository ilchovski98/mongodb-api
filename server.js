// grab the packages we need
const express = require('express');
const mongodb = require('mongodb');
const helmet = require('helmet');
const logger = require('./middlewares/logger');
require('dotenv').config();

// configure out app
const app = express();
const MongoClient = mongodb.MongoClient;
const port  = process.env.PORT || 3000;

console.log(`Node env: ${process.env.NODE_ENV}`);
console.log(`App settings: ${app.get('env')}`);

if (app.get('env') === 'development') {
  console.log('Logger is enabled...');
  app.use(logger);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// connect to our mongodb database
let cashedClient = null;
let cashedDb = null;

async function connectToDatabase() {
  if (cashedDb) return cashedDb;

  try {
    const client = await MongoClient.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db('tweets');

    cashedClient = client;
    cashedDb = db;

    return db
  } catch (error) {
    console.log(`Connection error: ${error}`);
  }
}

// create out routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// create
app.post('/tweets', async (req, res) => {
  const db = await connectToDatabase();
  const text = req.body.text;
  const tweet = await db.collection('tweets').insertOne({ text });
  res.send({tweet});
});

// read
app.get('/tweets', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const tweets = await db.collection('tweets').find({}).toArray();

    res.json({ tweets })
  } catch (error) {
    console.log(`Route error: ${error}`);
  }
});

// update
app.put('/tweets:tweetId', async (req, res) => {
  const tweetId = req.params.tweetId.replace(':', '');
  const db = await connectToDatabase();
  const text = req.body.text;
  const tweet = await db
    .collection('tweets')
    .updateOne({ _id: mongodb.ObjectId(tweetId) }, { $set: { text }});
  res.send({tweet});
});

// delete
app.delete('/tweets:tweetId', async (req, res) => {
  const tweetId = req.params.tweetId.replace(':', '');
  const db = await connectToDatabase();
  const tweet = await db
    .collection('tweets')
    .deleteOne({ _id: mongodb.ObjectId(tweetId) });
  res.send({tweet});
});

// create the server
app.listen(port, () => {
  console.log('Our app is running on port ', port);
})
