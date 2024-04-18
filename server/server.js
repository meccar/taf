const mongoose = require("mongoose");
const dotenv = require("dotenv");

// const Config = require("./config/config");

// const { PORT, DB_PASSWORD, DB } = Config;

dotenv.config({ path: "./app.env" });

const app = require("./app");

const port = process.env.PORT || 3000;
const url = process.env.MONGODB.replace(
  "<password>",
  process.env.MONGODB_PASSWORD,
);

mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
