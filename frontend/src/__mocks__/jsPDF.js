// src/__mocks__/jsPDF.js

class MockJsPDF {
  // Implement necessary methods or mocks for the jsPDF class
  // For example, you can define a mock method:
  save(filename) {
    console.log(`Mock save method called with filename: ${filename}`);
  }
}

module.exports = MockJsPDF;
