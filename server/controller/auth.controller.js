const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const { privateKey } = require("../config/config");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");

exports.verifyToken = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401),
    );
  }

  const decoded = await promisify(jwt.verify)(token, privateKey);
});
