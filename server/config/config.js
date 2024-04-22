const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: "./app.env" });

function readPemFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading PEM file:", filePath, error);
    throw new Error("Failed to read configuration. Check PEM file paths.");
  }
}

const Config = {
  privateKey: readPemFile(path.join(__dirname, "..", "id_rsa_priv.pem")),
  publicKey: readPemFile(path.join(__dirname, "..", "id_rsa_pub.pem")),
};

module.exports = Config;
