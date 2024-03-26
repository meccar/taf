const mongoose = require("mongoose");

const Config = require("../config/config.js");

// require("dotenv").config({ path: "../app.env" });
// var dbUser = process.env.MONGODB_USER;
// var dbPassword = process.env.MONGODB_PASSWORD;
// var dbName = process.env.MONGODB_NAME;

let db = Config.db;
db = db.replace("<password>", Config.db_password);
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
