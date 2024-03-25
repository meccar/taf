const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
// const cookie = require("cookie");

// Load the private key
const privateKey = fs.readFileSync(path.join(__dirname, "..", "priv.pem"));

// Define JWT options
const options = {
  algorithm: "RS256", // Algorithm used for signing
  expiresIn: 30 * 60, // Expiration time (30 minutes in this example)
  issuer: "https://qd4djl-3000.csb.app", // Issuer of the token
  audience: "https://qd4djl-3000.csb.app", // Audience of the token
};

// Function to generate JWT token asynchronously
async function generateToken(res) {
  try {
    // Generate JWT token asynchronously
    const token = await new Promise((resolve, reject) => {
      jwt.sign({ foo: "bar" }, privateKey, options, (err, token) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });

    return token;
  } catch (error) {
    throw new Error("Failed to generate JWT token: " + error.message);
  }
}

module.exports = generateToken;
