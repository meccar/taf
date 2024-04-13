const Account = require("../models/account.models.js");
const bcrypt = require("bcrypt");

const verifyRegister = async (req, res, next) => {
  try {
    const { email } = req.body;
    const [existingAccount, isEmailVerified] = await Promise.all([
      Account.findOne({ email }),
      Account.findOne({ email })
        .lean()
        .then((account) => account?.is_email_verified),
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

    next();
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

const verifyLogin = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const [user, isEmailVerified, passwordMatch] = await Promise.all([
      new Promise((resolve, reject) => {
        Account.findOne({ $or: [{ email }, { username }] })
          .then(resolve)
          .catch(reject);
      }),
      new Promise((resolve, reject) => {
        Account.findOne({ email })
          .lean()
          .then((account) => {
            resolve(account?.is_email_verified);
          })
          .catch(reject);
      }),
      bcrypt.compare(
        password,
        (await Account.findOne({ $or: [{ email }, { username }] }))?.password ||
          "",
      ),
    ]);

    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials" });
    }

    if (!isEmailVerified) {
      return res
        .status(403)
        .json({ status: "fail", message: "Account has not authorized" });
    }

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "fail", message: "Password is incorrect" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Login failed: " + error.message });
  }
};

// const verifyLogout = async (req, res, next) => {
//   try {
//     next();
//   } catch (error) {
//     return res.status(500).json({ status: "fail", message: "Logout failed: " + error.message });
//   }
// };

module.exports = {
  verifyRegister,
  verifyLogin,
};
