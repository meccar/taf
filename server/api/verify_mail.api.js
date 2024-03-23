const Verify_mail = require("../models/verify_mail.models.js");

exports.verifyMailForm = async (req, res, next) => {
  try {
    const { email, secret_code, is_used } = req.body;

    // // Create a new contact instance
    const newVerify_mail = new Verify_mail({
      email: email,
      secret_code: secret_code,
      is_used: is_used,
    });

    // Save the contact to the database
    await newVerify_mail.save();

    res.status(201).json({ message: "Mail verified successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
