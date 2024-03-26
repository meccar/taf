const path = require("path");
const fs = require("fs");

const Config = {
  privateKey: readPemFile(path.join(__dirname, "..", "priv.pem")),
  publicKey: readPemFile(path.join(__dirname, "..", "pub.pem")),
  port: readPemFile(path.join(__dirname, "..", "port.pem")),
  db_password: readPemFile(path.join(__dirname, "..", "mongodb_p.pem")),
  db: readPemFile(path.join(__dirname, "..", "mongodb.pem")),
};

function readPemFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading PEM file:", filePath, error);
    throw new Error("Failed to read configuration. Check PEM file paths.");
  }
}

module.exports = Config;
