const express = require("express");
const { trustProxy } = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
// const session = require("express-session");

const AppError = require("./util/appError");
const commentRoute = require("./routes/comment.route");
const communityRoute = require("./routes/community.route");
const contactRoute = require("./routes/contact.route");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const replyRoute = require("./routes/reply.route");
const ruleRoute = require("./routes/rule.route");
const voteRoute = require("./routes/vote.route");
const verifymailRoute = require("./routes/verifymail.route");
const ErrorHandler = require("./controller/error.controller");
const protectedRoute = require("./routes/protected.route");
const kafkaConfig = require("./config/config");

const app = express();

// Set scurity HTTP headers
app.use(helmet());
app.set("trust proxy", true);
app.set("trust proxy", "loopback");

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests. Please try again in an hour",
});

app.use("/api", limiter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use(cors({ origin: "*", credentials: true }));

// Body parser, reading data from body into req.body

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: "10kb" }));

// data sanitisation against NoSQL query injection
app.use(mongoSanitize());

// data sanitisation against CSS
app.use(xss());

// prevent http polution
app.use(
  hpp({
    whitelist: ["sth", "sth1", "sth2"],
  }),
);

// Seve static files
app.use(express.static("public"));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Cookie parser
app.use(cookieParser());

// app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/vote", voteRoute);
app.use("/api/v1/community", communityRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/reply", replyRoute);
app.use("/api/v1/rule", ruleRoute);
app.use("/api/v1/verifymail", verifymailRoute);

app.use("/user", protectedRoute);

const kafka = new kafkaConfig();
kafka.consume("consumer", (value) => {
  console.log(value);
});

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalURL}`, 404));
});

app.use(ErrorHandler);

module.exports = app;
