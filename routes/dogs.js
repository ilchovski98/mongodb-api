const auth = require('../middlewares/auth');
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

router.get('/custom-search', async (req, res) => {
  try {
    const dog = await dogModel.find({ name: { $in: ['Roki', 'Test']}});
    res.send(dog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create
router.post('/', auth, async (req, res) => {
  const dog = new dogModel({
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner
  });

  try {
    // send to database
    await dog.save();
    // send the data back as response
    res.send(dog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// read
router.get('/', async (req, res) => {
  try {
    const dogs = await dogModel.find({});

    res.send(dogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update
router.put('/:dogId', auth, async (req, res) => {
  try {
    const dog = await dogModel.findByIdAndUpdate(req.params.dogId, req.body);
    dog.save();
    res.send(dog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete
router.delete('/:dogId', auth, async (req, res) => {
  try {
    const dog = await dogModel.findByIdAndDelete(req.params.dogId);

    if (!dog) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
