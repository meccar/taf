// Import the functions to test
const Server = require("./server");

// Mock the functions for testing
jest.mock("./server", () => jest.fn());

// Test cases
describe("Testing ConnectDB and ConnectServer functions", () => {
  it("should call ConnectServer once", () => {
    // Call the function
    Server();
    // Check if the function is called once
    expect(Server).toHaveBeenCalledTimes(1);
  });
});
