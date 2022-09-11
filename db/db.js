const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cashedClient = null;
let cashedDb = null;

async function connectToDatabase() {
  if (cashedDb) return cashedDb;

  try {
    const client = await MongoClient.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db('tweets');

    cashedClient = client;
    cashedDb = db;

    return db
  } catch (error) {
    console.log(`Connection error: ${error}`);
  }
}

module.exports = {
  connectToDatabase: connectToDatabase,
  mongodb: mongodb,
  MongoClient: MongoClient
};
