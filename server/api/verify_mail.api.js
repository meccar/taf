const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Config = require("../config/config.js");

const VerifyMail = require("../models/verify_mail.models.js");

class VerifyMailController {
  async sendMail(req, res, email) {
    try {
      const secret_code = crypto.randomBytes(32).toString("hex");
      const verifyLink = `https://y43qh6-3000.csb.app/verify?email=${email}&secret_code=${secret_code}`;

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
          res.status(500).send("Error sending verification email.");
        } else {
          console.log("Email sent: " + info.response);
          res.send("Verification email sent.");
        }
      });

      // Create a new verify mail instance
      const newVerifyMail = new VerifyMail({
        email: email,
        secret_code: secret_code,
        // is_used: is_used,
      });

      // Save the verify mail to the database
      await newVerifyMail.save();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new VerifyMailController();
