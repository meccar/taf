const bcrypt = require("bcrypt");

const Account = require("../models/account.models.js");
const JWT = require("../token/jwt.js");
const { GeneratePaseto, EncryptPayload } = require("../token/paseto.js");
const VerifyMailController = require("../api/verify_mail.api.js");

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

      await VerifyMailController.sendMail(req, res, email);

      // Create a new account instance
      const newAccount = new Account({
        name: name,
        email: email,
        password: hashedPassword,
      });

      // Save the account to the database
      await newAccount.save();

      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Account.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Authentication failed" });
      }

      const is_email_verified = await Account.findOne({ email });
      console.log(!is_email_verified);
      if (!is_email_verified) {
        return res.status(404).json({ error: "Account has not authorized" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate and set token in cookie
      // const jwt = await JWT.generateToken();
      // await JWT.generateCookie(req, res, jwt);

      // // Generate access and refresh tokens
      const { accessToken, refreshToken } = await JWT.generateTokens();

      // // Set the access token as a cookie
      await JWT.generateCookie(req, res, accessToken);

      // Send the refresh token in the response body
      res.status(200).json({ accessToken, refreshToken });

      // const paseto = await GeneratePaseto();
      // await generateCookie(req, res, paseto);

      // const encryptedPayload = await EncryptPayload();

      // Respond with success message
      // res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed: " + error.message });
    }
  }

  async logout(req, res) {
    try {
      // Clear cookie
      res.clearCookie("token");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Logout failed: " + error.message });
    }
  }
}

module.exports = new UserController();
