const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
