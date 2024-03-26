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
        return res.status(404).json({ error: "Authentication failed" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate and set token in cookie
      const jwt = await generateToken();
      await generateCookie(req, res, jwt);

      // const paseto = await GeneratePaseto();
      // await generateCookie(req, res, paseto);

      const encryptedPayload = await EncryptPayload();

      // Respond with success message
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed: " + error.message });
    }
  }
}

module.exports = new LoginController();
