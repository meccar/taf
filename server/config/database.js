const mongoose = require("mongoose");

const Config = require("./config");

const url = Config.db.replace("<password>", Config.db_password);

async function ConnectDB() {
  try {
    await mongoose.connect(url).then(() => console.log("Connected to MongoDB"));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
}

// Export the connection function
module.exports = ConnectDB;
