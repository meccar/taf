const jwt = require("jsonwebtoken");
// const cookie = require("cookie");
// const cookieParser = require("cookie-parser");
const { promisify } = require("util");

const Account = require("../models/account.models");
const Config = require("../config/config");
// const option = require("../config/jwtConfig");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

// Function to generate JWT token asynchronously
exports.generateToken = (id) => {
  const option = {
    algorithm: "RS256", // Algorithm used for signing
    expiresIn: 1000 * 60 * 60 * 5, // Expiration time in seconds
  };

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  return jwt.sign(payload, Config.privateKey, option);
};

exports.verifyToken = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401),
    );
  }

  const decoded = await promisify(jwt.verify)(token, Config.publicKey);

  const currentUser = await Account.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401),
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "Your password was recently changed. Please login again",
        401,
      ),
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.decodedToken = (token) => {
  // Decode the token and return the payload (consider using verification with secret key for better security)
  const decoded = jwt.decode(token);
  return decoded;
};
