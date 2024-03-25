const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const cookie = require("cookie");

const header = {
  alg: "HS256", // Example algorithm (use the one you need)
  typ: "JWT", // Example token type
};

// Load the private key
const privateKey = fs.readFileSync(path.join(__dirname, "..", "priv.pem"));

// Define JWT options
const payload = {
  algorithm: "RS256", // Algorithm used for signing
  expiresIn: 30 * 60, // Expiration time (30 minutes in this example)
  issuer: "https://qd4djl-3000.csb.app", // Issuer of the token
  audience: "https://qd4djl-3000.csb.app", // Audience of the token
};

// Function to generate JWT token asynchronously
async function generateToken() {
  try {
    // Generate JWT token asynchronously
    const token = await new Promise((resolve, reject) => {
      jwt.sign(header, privateKey, payload, (err, token) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(token);
      });
    });

    // await generateCookie(res, token);
    return token;
  } catch (error) {
    throw new Error("Failed to generate JWT token: " + error.message);
  }
}
// , {
//   httpOnly: true,
//   secure: true,
//   domain: "qd4djl-3000.csb.app",
//   maxAge: 30 * 60 * 1000,
// }

async function generateCookie(req, res, token) {
  try {
    // await res.setHeader("Bearer", cookie.serialize(token));
    res.setHeader("Authorization", `Bearer ${token}`);
    console.log(token);
    console.log(req.headers);
    console.log(res.headers);
  } catch (error) {
    console.error("Failed to generate cookie:", error);
    throw error;
  }
}

async function getJwtFromHeader(req) {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and starts with 'Bearer '
    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract the token from the authorization header
      const token = authHeader.substring(7); // 'Bearer ' is 7 characters long

      // Return the JWT token
      return token;
    } else {
      throw new Error("Authorization header is missing or invalid");
    }
  } catch (error) {
    console.error("Failed to get JWT token from header:", error);
    throw error;
  }
}

module.exports = { generateToken, generateCookie, getJwtFromHeader };
