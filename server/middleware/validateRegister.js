const Account = require("../models/account.models");
const VerifyMailController = require("../controller/verify_mail.controller");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.validateRegister = catchAsync(async (req, res, next) => {
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

  req.newAccount = newAccount;
  next();
});
