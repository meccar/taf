const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const session = require("express-session");

const Config = require("../config/config.js");
const apiRoutes = require("./api_routes.js");
const protectedRoutes = require("./protected_routes.js");
const JWT = require("../token/jwt.js");

const { VerifyPaseto, DecryptPayload } = require("../middleware/pasetoAuth.js");

const port = Config.port;

async function ConnectServer() {
  try {
    app.use(helmet());
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      next();
    });

    app.use(cors({ origin: "*", credentials: true }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.use(express.json());
    app.use(cookieParser());

    app.use("/api", apiRoutes);

    app.use("/user", JWT.verifyToken, protectedRoutes);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Internal Server Error");
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
