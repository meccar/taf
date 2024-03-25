const VerifyMail = require("../models/verify_mail.models.js");

class VerifyMailController {
  async verifyMail(req, res, next) {
    try {
      const { email, secret_code, is_used } = req.body;

      // Create a new verify mail instance
      const newVerifyMail = new VerifyMail({
        email: email,
        secret_code: secret_code,
        is_used: is_used,
      });

      // Save the verify mail to the database
      await newVerifyMail.save();

      res.status(201).json({ message: "Mail verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new VerifyMailController();
