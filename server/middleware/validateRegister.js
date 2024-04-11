const bcrypt = require("bcrypt");
const Account = require("../models/account.models");
const VerifyMailController = require("../controller/verify_mail.controller");

const validateRegister = async (req, res, next) => {
  const { username, email, password: inputPass } = req.body;

  // Check if account exists and email is verified concurrently
  try {
    await Account.findOne({
      $or: [{ email }, { username }],
    });
    // const existingAccount = await Account.findOne({
    //   $or: [{ email }, { username }],
    // });
    // const isEmailVerified = existingAccount
    //   ? existingAccount.is_email_verified
    //   : false;

    // if (existingAccount && isEmailVerified) {
    //   return res.status(409).json({
    //     status: "fail",
    //     message: "Account already exists",
    //     data: { existingAccount, isEmailVerified },
    //   });
    // }

    // if (existingAccount && !isEmailVerified) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "Verification email was sent, please check your email",
    //     data: { existingAccount, isEmailVerified },
    //   });
    // }
    // if (existingAccount) {
    //   if (existingAccount.is_email_verified) {
    //     return res.status(409).json({
    //       status: "fail",
    //       message: "Account already exists",
    //       data: { existingAccount, isEmailVerified: true },
    //     });
    //   }
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "Verification email was sent, please check your email",
    //     data: { existingAccount, isEmailVerified: false },
    //   });
    // }

    const hashedPassword = await bcrypt.hash(inputPass, 12);

    // Create a new account
    const newAccount = await Account.create({
      username,
      email,
      password: hashedPassword,
    });

    // Send verification email
    await VerifyMailController.sendMail(req, res, email);

    req.newAccount = newAccount;
    next();
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      // If a duplicate key violation occurred for the 'email' field
      return res.status(409).json({
        status: "fail",
        message: "Email is already registered",
      });
    }
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = validateRegister;
