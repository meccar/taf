const Account = require("../models/account.models");
const VerifyMail = require("../models/verify_mail.models");

const validateEmail = async (req, res, next) => {
  // Check if account exists and email is verified concurrently
  try {
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
    next();
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = validateEmail;
