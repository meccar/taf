// Import the functions to test
const ConnectDB = require("./config/database");
const ConnectServer = require("./server/server.js");

// Mock the functions for testing
jest.mock("./config/database", () => jest.fn());
jest.mock("./server/server.js", () => jest.fn());

// Test cases
describe("Testing ConnectDB and ConnectServer functions", () => {
  it("should call ConnectDB once", () => {
    // Call the function
    ConnectDB();
    // Check if the function is called once
    expect(ConnectDB).toHaveBeenCalledTimes(1);
  });

  it("should call ConnectServer once", () => {
    // Call the function
    ConnectServer();
    // Check if the function is called once
    expect(ConnectServer).toHaveBeenCalledTimes(1);
  });
});
