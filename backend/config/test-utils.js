const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

/**
 * Connect to the in-memory MongoDB server.
 * This function should be called before running the tests.
 */
async function connect() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

/**
 * Close the database connection and stop the in-memory MongoDB server.
 * This function should be called after running the tests.
 */
async function closeDatabase() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

module.exports = { connect, closeDatabase };
