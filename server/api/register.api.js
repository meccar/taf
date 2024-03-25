const Account = require("../models/account.models.js");
const bcrypt = require("bcrypt");

class RegisterController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

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
}

module.exports = new RegisterController();
