/* eslint-disable prettier/prettier */
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const Config = require("../config/config");
const Account = require("../models/account.models");
const VerifyMail = require("../models/verify_mail.models");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.sendMail = async (req, res, email) => {
  const secretCode = crypto.randomBytes(32).toString("hex");
  const verifyLink = `https://turbo-space-carnival-9jjggjqj7vxfqp6-3000.app.github.dev/api/v1/verifymail/${email}/${secretCode}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: Config.mail,
      pass: Config.mail_password,
    },
  });

  const mailOptions = {
    from: Config.mail,
    to: email,
    subject: "Confirm your email address",
    text: `Click on this link to verify your email: ${verifyLink}`,
  };

  await transporter.sendMail(mailOptions); // Await throws error on rejection

  // Create a new verify mail instance
  const newVerifyMail = new VerifyMail({
    email: email,
    secret_code: secretCode,
  });

  // Save the verify mail to the database
  await newVerifyMail.save();
};

exports.verifyMail = catchAsync(async (req, res, next) => {
  const verification = await VerifyMail.findOne({
    email: req.params.email,
    secret_code: req.params.secretCode,
  });

  if (Date.now() > verification.expires_at) {
    this.sendMail(req, res, verification.email);
    return res.status(400).json({
      error:
        "Verification code expired. Please check your email for the latest one.",
    });
  }

  if (!verification) {
    return res.status(404).json({ message: "Invalid verification details" });
  }

  // Check if verification has already been used
  if (verification.is_used) {
    return res.status(400).json({ message: "Account already registered" });
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
