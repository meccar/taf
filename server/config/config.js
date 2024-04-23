const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: "./app.env" });

const Config = {
  privateKey: fs.readFileSync(
    path.join(__dirname, "..", "id_rsa_priv.pem"),
    "utf8",
  ),
  publicKey: fs.readFileSync(
    path.join(__dirname, "..", "id_rsa_pub.pem"),
    "utf8",
  ),
  header: {
    alg: "RS256", // Example algorithm (use the one you need)
    typ: "JWT", // Example token type
  },

  option: {
    algorithm: "RS256", // Algorithm used for signing
    expiresIn: process.env.JWT_EXPIRES_IN, // Expiration time in seconds
  },
};

module.exports = Config;
