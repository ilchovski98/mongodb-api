const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');

// create
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  const result = await user.save();
  res.send(result);
});

// read
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// // update
// router.put('/:tweetId', async (req, res) => {
//   try {
//     const tweet = await tweetModel.findByIdAndUpdate(req.params.tweetId, { text: req.body.text });
//     await tweet.save();
//     res.send(tweet);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // delete
// router.delete('/:tweetId', async (req, res) => {
//   try {
//     const tweet = await tweetModel.findByIdAndDelete(req.params.tweetId);
//     tweet.save();
//     res.send(tweet);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
