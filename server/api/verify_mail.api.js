const crypto = require("crypto");
const nodemailer = require("nodemailer");

const Config = require("../config/config.js");
const VerifyMail = require("../models/verify_mail.models.js");

class VerifyMailController {
  async sendMail(req, res, email) {
    try {
      const secret_code = crypto.randomBytes(32).toString("hex");
      const verifyLink = `https://y43qh6-3000.csb.app/api/verifymail/${email}/${secret_code}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: Config.mail,
          pass: Config.mail_password,
        },
      });

      const mailOptions = {
        from: Config.mail,
        to: email,
        subject: "Confirm your email address",
        text: `Click on this link to verify your email: ${verifyLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error sending verification email.");
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // Create a new verify mail instance
      const newVerifyMail = new VerifyMail({
        email: email,
        secret_code: secret_code,
      });

      // Save the verify mail to the database
      await newVerifyMail.save();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async verifyMail(req, res) {
    try {
      const verification = await Verify_mail.findOne({
        email: req.params.email,
        secret_code: req.params.secret_code,
      });

      if (!verification) {
        return res.status(404).json({ error: "Invalid verification details" });
      }

      // Check if verification has already been used
      if (verification.is_used) {
        return res.status(400).json({ error: "Account already registered" });
      }

      verification.is_used = true;
      await verification.save();

      // Find the associated account using the email from verification
      const account = await Account.findOne({ email: verification.email });

      // Update the account's email verification status
      account.is_email_verified = true;
      await account.save();

      return res.status(200).send("Account registered successfully");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new VerifyMailController();
