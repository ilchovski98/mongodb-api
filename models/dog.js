const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    required: true,
    trim: true
  }
});

const Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;
