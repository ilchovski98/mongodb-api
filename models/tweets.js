const mongoose = require('mongoose');

const Tweet = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

const tweetModel = mongoose.model('Tweet', Tweet);

module.exports = tweetModel;
