const bcrypt = require("bcrypt");
const Account = require("../models/account.models");
const JWT = require("../token/jwt");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");

exports.validateLogin = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if account exists and email is verified concurrently
  const [user, isEmailVerified, passwordMatch] = await Promise.all([
    new Promise((resolve, reject) => {
      Account.findOne({ $or: [{ email }, { username }] })
        .then(resolve)
        .catch(reject);
    }),

    new Promise((resolve, reject) => {
      Account.findOne({ email })
        .lean()
        .then((account) => {
          resolve(account.is_email_verified);
        })
        .catch(reject);
    }),

    console.log(user),

    bcrypt.compare(
      password,
      (await Account.findOne({ $or: [{ email }, { username }] })).password ||
        "",
    ),
  ]);

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  if (!isEmailVerified) {
    return next(new AppError("Account has not authorized", 403));
  }

  if (!passwordMatch) {
    return next(new AppError("Password is incorrect", 401));
  }

  delete user.password;

  const { accessToken, refreshToken } = await JWT.generateTokens(user._id);
  await JWT.generateCookie(req, res, accessToken);
  await res.setHeader("Authorization", `Bearer ${accessToken}`);

  req.accessToken = accessToken;
  req.refreshToken = refreshToken;
  req.user = user;
  next();
});
