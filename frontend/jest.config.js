module.exports = {
  transformIgnorePatterns: ["/node_modules/(?!(babel-jest|@mui)/)", "../frontend/node_modules/(?!@mui/.*\\.js$)", "/node_modules/(?!(babel-jest|@mui|d3-ease))"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^.*\\.scss$": "../frontend/src/__mocks__/styleMock.js",
    "^axios$": "../frontend/src/__mocks__/axios.js", // Mock Axios module
    "^react-router-dom$": "../frontend/src/__mocks__/react-router-dom.js", // Mock react-router-dom package
    "^d3-ease$": "../frontend/src/__mocks__/d3-ease.js",
    "^.*\\.png$": "../frontend/src/__mocks__/logoMock.js",
    "^useState$": "../frontend/src/__mocks__/useState.js",
    "^jsPDF$": "../frontend/src/__mocks__/jsPDF.js",
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // Update the transform configuration to include TypeScript files
  },
  globals: {
    NODE_ENV: "test",
    "babel-jest": {
      enableBabelRuntime: true,
      enableTypeScript: true,
    },
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/build/", "/dist/"],
  testEnvironment: "jsdom",
};
