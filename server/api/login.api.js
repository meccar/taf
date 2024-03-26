const Account = require("../models/account.models.js");
const { generateToken, generateCookie } = require("../token/jwt.js");
const { GeneratePaseto, EncryptPayload } = require("../token/paseto.js");
const bcrypt = require("bcrypt");

class LoginController {
  async login(req, res, next) {
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
      const jwt = await generateToken();
      await generateCookie(req, res, jwt);

      const paseto = await GeneratePaseto();
      console.log(paseto);
      const encryptedPayload = await EncryptPayload();
      console.log(encryptedPayload);

      // Respond with success message
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed: " + error.message });
    }
  }
}

module.exports = new LoginController();
