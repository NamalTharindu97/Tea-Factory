// Starts an in-memory MongoDB so tests never touch the real database.
const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports = async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.CONNECTION_STRING = mongod.getUri("Tea-Factory");
  global.__MONGOD__ = mongod;
};
