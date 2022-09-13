const mongoose = require('mongoose');

const Tweet = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['postman', 'work', 'personal']
  },
  tags: {
    type: Array,
    validate: {
      validator: function(value) {
        return value && value.length > 0;
      },
      message: 'A course should have at least one tag.'
    }
  }
});

const tweetModel = mongoose.model('Tweet', Tweet);

module.exports = tweetModel;
