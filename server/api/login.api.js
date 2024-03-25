const Account = require("../models/account.models.js");
const generateToken = require("../token/jwt.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginForm = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid usrename" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
    }
    // const token = jwt.sign({ userId: user.id }, "your-secret-key", {
    //   expiresIn: "1h",
    // });

    // Generate and set token in cookie
    generateToken(res)
      .then(() => {
        // Respond with success message
        res.status(200).json({ message: "Login successful" });
      })
      .catch((error) => {
        console.error("Error generating token:", error);
        res.status(500).json({ message: "Login failed: " + error.message });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed: " + error.message });
  }
};
