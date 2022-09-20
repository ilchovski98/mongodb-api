const auth = require('../middlewares/auth');
const { asyncMiddleware } = require('../middlewares/async');
const express = require('express');
const router = express.Router();
const tweetModel = require('../models/tweets');

// create
router.post('/', asyncMiddleware(async (req, res) => {
  const tweet = await tweetModel(req.body);
  await tweet.save();
  res.send(tweet);
}));

// read
router.get('/', asyncMiddleware(async (req, res) => {
  const tweets = await tweetModel.find({});
  res.send(tweets);
}));

// update
router.put('/:tweetId', auth, asyncMiddleware(async (req, res) => {
  const tweet = await tweetModel.findByIdAndUpdate(req.params.tweetId, { text: req.body.text });
  await tweet.save();
  res.send(tweet);
}));

// delete
router.delete('/:tweetId', auth, asyncMiddleware(async (req, res) => {
  const tweet = await tweetModel.findByIdAndDelete(req.params.tweetId);
  tweet.save();
  res.send(tweet);
}));

module.exports = router;
