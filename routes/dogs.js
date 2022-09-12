const express = require('express');
const router = express.Router();
const { connectToDatabase, mongodb } = require('../db/db');

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than ot equal to)
// lt (less than)
// lte  (less than or equal to)
// in
// nin (not in)

// Starts with Mosh
// .find({ owner: /^Mosh/ })

// Ends with Mosh
// .find({ owner: /Mosh$/i })

// Contains with Mosh
// i makes the expression case insensitive
// .find({ owner: /.*Mosh.*/i })

router.get('/custom-search', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const dog = await db.collection('dogs').find({ name: { $in: ['Roki', 'Test']}}).toArray();
    res.send({dog});
  } catch (error) {
    console.log(`Failed search: ${error}`);
  }
});

// create
router.post('/', async (req, res) => {
  const db = await connectToDatabase();
  const dog = await db.collection('dogs').insertOne({
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner
  });
  res.send({dog});
});

// read
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const dogs = await db.collection('dogs').find({}).toArray();

    res.json({ dogs })
  } catch (error) {
    console.log(`Route error: ${error}`);
  }
});

// update
router.put('/:dogId', async (req, res) => {
  const dogId = req.params.dogId.replace(':', '');
  const db = await connectToDatabase();
  const dog = await db
    .collection('dogs')
    .updateOne({ _id: mongodb.ObjectId(dogId) }, { $set: { ...req.body }});
  res.send({dog});
});

// delete
router.delete('/:dogId', async (req, res) => {
  const dogId = req.params.dogId.replace(':', '');
  console.log('req.params.dogId', req.params.dogId);
  const db = await connectToDatabase();
  const dog = await db
    .collection('dogs')
    .deleteOne({ _id: mongodb.ObjectId(dogId) });
  res.send({dog});
});

module.exports = router;
