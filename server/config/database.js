const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

var dbUser = process.env.MONGODB_USER;
var dbPassword = process.env.MONGODB_PASSWORD;
var dbName = process.env.MONGODB_NAME;

var password = fs.readFileSync(
  path.join(__dirname, "..", "mongodb_p.pem"),
  "utf8",
);
let db = fs.readFileSync(path.join(__dirname, "..", "mongodb.pem"), "utf8");
db = db.replace("<password>", password);
// const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbName}.ubmfujh.mongodb.net/?retryWrites=true&w=majority&appName=mongodb`;
const uri = db;

async function ConnectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
}

// Export the connection function
module.exports = ConnectDB;
