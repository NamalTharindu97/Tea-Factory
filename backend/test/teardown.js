// Stops the in-memory MongoDB started by test/setup.js.
module.exports = async () => {
  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
  }
};
