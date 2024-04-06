const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Config = require("./config/config");

const { PORT, DB_PASSWORD, DB } = Config;

dotenv.config({ path: "./app.env" });

const app = require("./app");

const port = PORT || 3000;
const url = DB.replace("<password>", DB_PASSWORD);

mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
