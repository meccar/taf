const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Account = require("../models/account.models");
const { privateKey } = require("../config/config");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");
const sendEmail = require("../util/email");
const JWT = require("../token/jwt");

const createSendToken = (user, statusCode, res) => {
  const token = JWT.generateCookie(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if account exists and email is verified concurrently
  // const [user, isEmailVerified, passwordMatch] = await Promise.all([
  const user = await Account.findOne({ $or: [{ email }, { username }] }).select(
    "+password",
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 401));
  }

  delete user.password;

  // const { accessToken, refreshToken } = await JWT.generateTokens(user._id);

  // await JWT.generateCookie(req, res, accessToken);
  // await res.setHeader("Authorization", `Bearer ${accessToken}`);

  // const { accessToken, refreshToken, user } = req;

  createSendToken(user, 200, res);
});

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

  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? submit a patch request with your new password to ${resetURL}\nIf you didn't forget your password, please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your reset token (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Account.findOne({
    passwoedResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or expired", 400));
  }

  user.password = req.body.password;
  // user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await Account.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is incorrect", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  createSendToken(user, 200, res);
});
