const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const Account = require("../models/account.models");
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

  const currentUser = Account.findById(decoded.id);
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
  next();
});
