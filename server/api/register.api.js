const Account = require("../models/account.models.js");
const bcrypt = require("bcrypt");

exports.registerForm = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    // // Create a new contact instance
    const newAccount = new Account({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Save the contact to the database
    await newAccount.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
