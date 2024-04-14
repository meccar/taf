const catchAsync = require("../util/catchAsync");
const VerifyMailController = require("./verify_mail.controller");
const Account = require("../models/account.models");
const AppError = require("../util/appError");

exports.register = catchAsync(async (req, res, next) => {
  // Create a new account
  const newAccount = await Account.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Send verification email
  // await VerifyMailController.sendMail(req, res, email);

  // const { newAccount } = req;
  return res.status(202).json({
    status: "success",
    message: "Verification email sent successful",
    data: { newAccount },
  });
});

// exports.login = catchAsync(async (req, res, next) => {
//   const { username, email, password } = req.body;

//   // Check if account exists and email is verified concurrently
//   // const [user, isEmailVerified, passwordMatch] = await Promise.all([
//   const user = await Account.findOne({ $or: [{ email }, { username }] }).select(
//     "+password",
//   );

//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError("Incorrect Email or Password", 401));
//   }

//   delete user.password;

//   const { accessToken, refreshToken } = await JWT.generateTokens(user._id);

//   await JWT.generateCookie(req, res, accessToken);
//   await res.setHeader("Authorization", `Bearer ${accessToken}`);

//   // const { accessToken, refreshToken, user } = req;

//   return res
//     .status(200)
//     .json({ status: "success", accessToken, refreshToken, data: { user } });
// });

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ status: "success", message: "Logout successful" });
});
