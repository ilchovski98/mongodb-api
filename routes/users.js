const auth = require('../middlewares/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');

router.get('/me', auth, async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.user._id }).select('-password');

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
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

// create
router.post('/', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
