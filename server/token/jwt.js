const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const cookie = require("cookie");

const header = {
  alg: "RS256", // Example algorithm (use the one you need)
  typ: "JWT", // Example token type
};

// Load the private key
const privateKey = fs.readFileSync(path.join(__dirname, "..", "priv.pem"));

// Define JWT options
const payload = {
  algorithm: "RS256", // Algorithm used for signing
  expiresIn: 30 * 60, // Expiration time (30 minutes in this example)
  issuer: "y43qh6-3000.csb.app", // Issuer of the token
  audience: "y43qh6-3000.csb.app", // Audience of the token
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

async function generateCookie(req, res, token) {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      domain: "y43qh6-3000.csb.app",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    };
    // await res.setHeader("Bearer", cookie.serialize(token));
    await res.setHeader("Authorization", `Bearer ${token}`);

    res.cookie("jwt", token, cookieOptions);
  } catch (error) {
    console.error("Failed to generate cookie:", error);
    throw error;
  }
}

module.exports = { generateToken, generateCookie };
