const bcrypt = require("bcrypt");
const Account = require("../models/account.models");
const VerifyMailController = require("../controller/verify_mail.controller");

const validateRegister = async (req, res, next) => {
  const { username, email, password: inputPass } = req.body;

  // Check if account exists and email is verified concurrently
  try {
    const [existingAccount, isEmailVerified] = await Promise.all([
      Account.findOne({ $or: [{ email }, { username }] }),
      Account.findOne({ email })
        .lean()
        .then((account) => account.is_email_verified),
    ]);

    if (existingAccount && isEmailVerified) {
      return res
        .status(409)
        .json({ status: "fail", message: "Account already exists" });
    }

    if (existingAccount && !isEmailVerified) {
      return res.status(400).json({
        status: "fail",
        message: "Verification email was sent, please check your email",
      });
    }

    const hashedPassword = await bcrypt.hash(inputPass, 12);

    let newAccount;
    // Send verification email and create new account concurrently
    await Promise.all([
      VerifyMailController.sendMail(req, res, email),
      new Promise((resolve, reject) => {
        Account.create({
          username,
          email,
          password: hashedPassword,
        })
          .save()
          .then(() => {
            resolve(newAccount);
          })
          .catch((error) => reject(error));
      }),
    ]);
    req.newAccount = newAccount;
    next();
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = validateRegister;
