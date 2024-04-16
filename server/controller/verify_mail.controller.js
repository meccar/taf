/* eslint-disable prettier/prettier */
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const Account = require("../models/account.models");
const Config = require("../config/config");
const VerifyMail = require("../models/verify_mail.models");
const catchAsync = require("../util/catchAsync");
const sendEmail = require("../util/email");
const AppError = require("../util/appError");

exports.sendMail = async (req, res, next, email) => {
  const secretCode = crypto.randomBytes(32).toString("hex");
  const verifyLink = `${req.protocol}://${req.get("host")}/api/v1/verifymail/${email}/${secretCode}`;
  const message = `Click on this link to verify your email: ${verifyLink}`;

  try {
    await sendEmail({
      email: email,
      subject: "Your reset token (valid for 10 minutes)",
      message,
    });

    // Create a new verify mail instance
    const newVerifyMail = new VerifyMail({
      email: email,
      secret_code: secretCode,
    });

    // Save the verify mail to the database
    await newVerifyMail.save();
    next();
  } catch (err) {
    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500,
      ),
    );
  }
};

exports.verifyMail = catchAsync(async (req, res, next) => {
  const verification = await VerifyMail.findOne({
    email: req.params.email,
    secret_code: req.params.secretCode,
  });

  if (Date.now() > verification.expires_at) {
    this.sendMail(req, res, verification.email);
    return next(
      new AppError(
        "Verification code expired. Please check your email for the latest one",
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

  return res.status(200).json({ message: "Account registered successfully" });
});
