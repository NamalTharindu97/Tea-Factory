module.exports = {
  testEnvironment: "node",
  globalSetup: require.resolve("./test/setup.js"),
  globalTeardown: require.resolve("./test/teardown.js"),
};
