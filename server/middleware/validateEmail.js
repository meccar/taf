const Account = require("../models/account.models");
const VerifyMail = require("../models/verify_mail.models");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.validateEmail = catchAsync(async (req, res, next) => {
  const verification = await VerifyMail.findOne({
    email: req.params.email,
    secret_code: req.params.secretCode,
  });

  if (Date.now() > verification.expires_at) {
    this.sendMail(req, res, verification.email);
    return next(
      new AppError(
        "Verification code expired. Please check your email for the latest one.",
        400,
      ),
    );
  }

  if (!verification) {
    return next(new AppError("Invalid verification details", 404));
  }

  // Check if verification has already been used
  if (verification.is_used) {
    return next(new AppError("Account already registered", 400));
  }

  verification.is_used = true;
  await verification.save();

  // Find the associated account using the email from verification
  const account = await Account.findOne({ email: verification.email });

  // Update the account's email verification status
  account.is_email_verified = true;
  await account.save();
  next();
});
