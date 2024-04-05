const bcrypt = require("bcrypt");
const Account = require("../models/account.models");

const validateRegister = async (req, res, next) => {  
  try {
    const { username, email, password: inputPass.w } = req.body;

    // Check if account exists and email is verified concurrently
    const [existingAccount, isEmailVerified] = await Promise.([
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

    const password = await bcrypt.hash(password, 12);

    next();
  } catch (error) {
    throw error;
  }
};

module.exports = validateRegister;
