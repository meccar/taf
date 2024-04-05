const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
// const session = require("express-session");
const morgan = require("morgan");

// const apiRoutes = require("./api_routes");
const commentRoute = require("./routes/commentRoute");
const communityRoute = require("./routes/communityRoute");
const contactRoute = require("./routes/contactRoute");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const postRoute = require("./routes/postRoute");
const registerRoute = require("./routes/registerRoute");
const replyRoute = require("./routes/replyRoute");
const ruleRoute = require("./routes/ruleRoute");
const verifymailRoute = require("./routes/verifymailRoute");

const protectedRoute = require("./routes/protectedRoute");
const JWT = require("./token/jwt");

// const { VerifyPaseto, DecryptPayload } = require("./middleware/pasetoAuth");

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

app.use(morgan("dev"));

app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/community", communityRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/login", loginRoute);
app.use("/api/v1/logout", logoutRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/register", registerRoute);
app.use("/api/v1/reply", replyRoute);
app.use("/api/v1/rule", ruleRoute);
app.use("/api/v1/verifymail", verifymailRoute);

app.use("/user", JWT.verifyToken, protectedRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
