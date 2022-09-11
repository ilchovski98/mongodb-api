const express = require('express');
const router = express.Router();
const { connectToDatabase, mongodb } = require('../db/db');

// create
router.post('/', async (req, res) => {
  const db = await connectToDatabase();
  const text = req.body.text;
  const tweet = await db.collection('tweets').insertOne({ text });
  res.send({tweet});
});

// read
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const tweets = await db.collection('tweets').find({}).toArray();

    res.json({ tweets })
  } catch (error) {
    console.log(`Route error: ${error}`);
  }
});

// update
router.put('/:tweetId', async (req, res) => {
  const tweetId = req.params.tweetId.replace(':', '');
  const db = await connectToDatabase();
  const text = req.body.text;
  const tweet = await db
    .collection('tweets')
    .updateOne({ _id: mongodb.ObjectId(tweetId) }, { $set: { text }});
  res.send({tweet});
});

// delete
router.delete('/:tweetId', async (req, res) => {
  const tweetId = req.params.tweetId.replace(':', '');
  console.log('req.params.tweetId', req.params.tweetId);
  const db = await connectToDatabase();
  const tweet = await db
    .collection('tweets')
    .deleteOne({ _id: mongodb.ObjectId(tweetId) });
  res.send({tweet});
});

module.exports = router;
