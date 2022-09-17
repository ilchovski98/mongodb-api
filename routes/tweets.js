const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const tweetModel = require('../models/tweets');

// create
router.post('/', auth, async (req, res) => {
  try {
    const tweet = await tweetModel(req.body);

    await tweet.save();
    res.send(tweet);
  } catch (error) {
    res.status(500).send(error);
  }
});

// read
router.get('/', async (req, res) => {
  try {
    const tweets = await tweetModel.find({});

    res.send(tweets);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update
router.put('/:tweetId', auth, async (req, res) => {
  try {
    const tweet = await tweetModel.findByIdAndUpdate(req.params.tweetId, { text: req.body.text });
    await tweet.save();
    res.send(tweet);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete
router.delete('/:tweetId', auth, async (req, res) => {
  try {
    const tweet = await tweetModel.findByIdAndDelete(req.params.tweetId);
    tweet.save();
    res.send(tweet);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
