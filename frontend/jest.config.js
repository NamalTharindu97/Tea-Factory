module.exports = {
  transformIgnorePatterns: ["../frontend/node_modules/(?!@mui/.*\\.js$)"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
