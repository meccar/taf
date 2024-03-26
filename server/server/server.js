const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const Config = require("../config/config.js");
const apiRoutes = require("./api_routes.js");
const protectedRoutes = require("./protected_routes.js");
const JWT = require("../token/jwt.js");

const { VerifyPaseto, DecryptPayload } = require("../middleware/pasetoAuth.js");

const path = require("path");
const fs = require("fs");

// const port = process.env.PORT;
const port = Config.port;

async function ConnectServer() {
  try {
    app.use(cors({ origin: "*" }));
    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.use(express.json());
    app.use(cookieParser());

    app.use("/api", apiRoutes);

    app.use("/user", JWT.verifyToken, protectedRoutes);

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
