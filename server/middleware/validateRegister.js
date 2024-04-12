const Account = require("../models/account.models");
const VerifyMailController = require("../controller/verify_mail.controller");

const validateRegister = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if account exists and email is verified concurrently
  try {
    await Account.findOne({
      $or: [{ email }, { username }],
    });

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
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = validateRegister;
