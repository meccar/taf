const Account = require("../models/account.models.js");
const GenerateToken = require("../token/jwt.js");
const bcrypt = require("bcrypt");

class AuthController {
  async loginForm(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Account.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Invalid username" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate and set token in cookie
      const token = await GenerateToken(req);

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        domain: "qd4djl-3000.csb.app",
        maxAge: 30 * 60 * 1000,
      });

      // Respond with success message
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed: " + error.message });
    }
  }
}

module.exports = new AuthController();
