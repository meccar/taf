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
  console.log(decoded);

  const currentUser = await Account.findById(decoded.user_id);

  console.log(currentUser);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401),
    );
  }

  // console.log(currentUser.changedPasswordAfter(decoded.iat));

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

// exports.retrictTo = (...roles) => {
//   (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError("You do not have permission to perform this action", 403),
//       );
//     }
//     next();
//   };
// };

exports.retrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await Account.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("The account does not exist", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
});
exports.resetPassword = (req, res, next) => {};
