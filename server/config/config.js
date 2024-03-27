const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: "./app.env" });

const Config = {
  privateKey: readPemFile(path.join(__dirname, "..", "priv.pem")),
  publicKey: readPemFile(path.join(__dirname, "..", "pub.pem")),
  port: readPemFile(path.join(__dirname, "..", "port.pem")),
  db_password: process.env.MONGODB_PASSWORD,
  db: process.env.MONGODB,
  mail: process.env.EMAIL_SENDER_ADDRESS,
  mail_password: process.env.EMAIL_SENDER_PASSWORD,
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
