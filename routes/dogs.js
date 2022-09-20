const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { asyncMiddleware } = require('../middlewares/async');
const express = require('express');
const router = express.Router();
const dogModel = require('../models/dog');

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than ot equal to)
// lt (less than)
// lte  (less than or equal to)
// in
// nin (not in)

router.get('/custom-search', asyncMiddleware(async (req, res) => {
  const dog = await dogModel.find({ name: { $in: ['Roki', 'Test']}});
  res.send(dog);
}));

// create
router.post('/', auth, asyncMiddleware(async (req, res) => {
  const dog = new dogModel({
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner
  });

  // send to database
  await dog.save();
  // send the data back as response
  res.send(dog);
}));

// read
router.get('/', asyncMiddleware(async (req, res) => {
  const dogs = await dogModel.find({});
  res.send(dogs);
}));

// update
router.put('/:dogId', auth, asyncMiddleware(async (req, res) => {
  const dog = await dogModel.findByIdAndUpdate(req.params.dogId, req.body);
  dog.save();
  res.send(dog);
}));

// delete
router.delete('/:dogId', [auth, admin], asyncMiddleware(async (req, res) => {
  const dog = await dogModel.findByIdAndDelete(req.params.dogId);
  if (!dog) res.status(404).send("No item found");
  res.status(200).send();
}));

module.exports = router;
