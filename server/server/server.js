const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoutes = require("./api_routes.js");
const protectedRoutes = require("./protected_routes.js");

const port = process.env.PORT;

async function ConnectServer() {
  try {
    app.use(cors({ origin: "*" }));
    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.use(express.json());

    app.use("/api", apiRoutes);
    app.use("/user", protectedRoutes);

    app.use(function (err, req, res, next) {
      res.status(422).send({ error: err.message });
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to Server:", error);
    process.exit(1); // Exit process with failure
  }
}

module.exports = ConnectServer;
