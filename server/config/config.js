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
  privateKey: readPemFile(path.join(__dirname, "..", "priv.pem")),
  publicKey: readPemFile(path.join(__dirname, "..", "pub.pem")),
  port: process.env.PORT,
  db_password: process.env.MONGODB_PASSWORD,
  db: process.env.MONGODB,
  mail: process.env.EMAIL_SENDER_ADDRESS,
  mail_password: process.env.EMAIL_SENDER_PASSWORD,
  node_env: process.env.NODE_ENV,
};

module.exports = Config;
