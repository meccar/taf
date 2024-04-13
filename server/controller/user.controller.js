const bcrypt = require("bcrypt");
const catchAsync = require("../util/catchAsync");
const VerifyMailController = require("./verify_mail.controller");
const Account = require("../models/account.models");
const AppError = require("../util/appError");
const JWT = require("../token/jwt");

exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if account exists and email is verified concurrently
  const existingAccount = await Account.findOne({
    $or: [{ email }, { username }],
  });

  if (existingAccount) {
    return next(new AppError("Account already exists", 409));
  }

  // Create a new account
  const newAccount = await Account.create({
    username,
    email,
    password,
  });

  // Send verification email
  await VerifyMailController.sendMail(req, res, email);

  // const { newAccount } = req;
  return res.status(202).json({
    status: "success",
    message: "Verification email sent successful",
    data: { newAccount },
  });
});

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

  // new Promise((resolve, reject) => {
  //   Account.findOne({ email })
  //     .lean()
  //     .then((account) => {
  //       resolve(account.is_email_verified);
  //     })
  //     .catch(reject);
  // }),
  // if (!isEmailVerified) {
  //   return next(new AppError("Account has not authorized", 403));
  // }

  // const passwordMatch = await bcrypt.compare(password, user.password);

  delete user.password;
  console.log(user);

  const { accessToken, refreshToken } = await JWT.generateTokens(user._id);
  await JWT.generateCookie(req, res, accessToken);
  await res.setHeader("Authorization", `Bearer ${accessToken}`);

  // const { accessToken, refreshToken, user } = req;

  return res
    .status(200)
    .json({ status: "success", data: { accessToken, refreshToken, user } });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ status: "success", message: "Logout successful" });
});
