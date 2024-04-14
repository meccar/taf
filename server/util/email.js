const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //   console.log("before transporter");
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    service: "gmail",

    auth: {
      user: process.env.EMAIL_SENDER_ADDRESS,
      pass: process.env.EMAIL_SENDER_PASSWORD,
    },
  });

  //   console.log("before mailOptions");
  const mailOptions = {
    from: "TAF <info@taf.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  //   console.log("before sendMail");
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
