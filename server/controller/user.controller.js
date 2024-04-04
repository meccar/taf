const bcrypt = require("bcrypt");
const Account = require("../models/account.models");
const JWT = require("../token/jwt");
// const { GeneratePaseto, EncryptPayload } = require("../token/paseto");
const VerifyMailController = require("./verify_mail.controller");

class UserController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if account exists and email is verified concurrently
      const [existingAccount, isEmailVerified] = await Promise.all([
        Account.findOne({ email }),
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

      const hashedPassword = await bcrypt.hash(password, 12);

      // Send verification email and create new account concurrently
      await Promise.all([
        VerifyMailController.sendMail(req, res, email),
        new Promise((resolve, reject) => {
          const newAccount = new Account({
            username,
            email,
            password: hashedPassword,
          });
          newAccount.save().then(resolve).catch(reject);
        }),
      ]);

      return res.status(202).json({
        status: "success",
        message: "Verification email sent successful",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, email, password } = req.body;

      // Find the user by email or username, check if the email is verified, and verify the password concurrently
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
          (await Account.findOne({ $or: [{ email }, { username }] }))
            .password || "",
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

      return res
        .status(200)
        .json({ status: "success", data: { accessToken, refreshToken } });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "fail", message: `Login failed: ${error.message}` });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token");
      return res
        .status(200)
        .json({ status: "success", message: "Logout successful" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "fail", message: `Logout failed: ${error.message}` });
    }
  }
}

module.exports = new UserController();
