const express = require('express');
const router = express.Router();
const { connectToDatabase, mongodb } = require('../db/db');

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
