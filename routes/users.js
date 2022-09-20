const auth = require('../middlewares/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const { asyncMiddleware } = require('../middlewares/async');

router.get('/me', auth, asyncMiddleware(async (req, res) => {
  const result = await User.findOne({ _id: req.user._id }).select('-password');
  res.send(result);
}));

// read
router.get('/', asyncMiddleware(async (req, res) => {
  const users = await User.find({});
  res.send(users);
}));

// create
router.post('/', asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateAuthToken();

  const result = await user.save();
  res.header('x-auth-token', token).send(_.pick(result, ['name', 'email']));
}));

module.exports = router;
