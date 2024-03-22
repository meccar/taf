const Account = require("../models/account.models.js");
const bcrypt = require("bcrypt");

exports.loginForm = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid usrename" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
