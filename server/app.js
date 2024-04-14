const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
// const session = require("express-session");
const morgan = require("morgan");

// const apiRoutes = require("./api_routes");
const AppError = require("./util/appError");
const commentRoute = require("./routes/comment.route");
const communityRoute = require("./routes/community.route");
const contactRoute = require("./routes/contact.route");
const userRoute = require("./routes/user.route");
// const logoutRoute = require("./routes/logoutRoute");
const postRoute = require("./routes/post.route");
const replyRoute = require("./routes/reply.route");
const ruleRoute = require("./routes/rule.route");
const verifymailRoute = require("./routes/verifymail.route");
const ErrorHandler = require("./controller/error.controller");
const protectedRoute = require("./routes/protected.route");
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

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/community", communityRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reply", replyRoute);
app.use("/api/v1/rule", ruleRoute);
app.use("/api/v1/verifymail", verifymailRoute);

app.use("/user", protectedRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalURL}`, 404));
});
app.use(ErrorHandler);

module.exports = app;
