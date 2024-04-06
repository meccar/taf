const bcrypt = require("bcrypt");
const Account = require("../models/account.models");
const JWT = require("../token/jwt");


const validateRegister = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if account exists and email is verified concurrently
  try {
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
            resolve(account.is_email_verified);
          })
          .catch(reject);
      }),

      bcrypt.compare(
        password,
        (await Account.findOne({ $or: [{ email }, { username }] })).password ||
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

    delete user.password;

    const { accessToken, refreshToken } = await JWT.generateTokens(user._id);
    await JWT.generateCookie(req, res, accessToken);
    await res.setHeader("Authorization", `Bearer ${accessToken}`);

    next();
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = validateRegister;
