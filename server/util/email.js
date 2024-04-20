const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.username = user.username;
    this.url = url;
    this.from = `TAF <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    if (process.env.NODE_ENV === "production"){
      return 1
    }

    return nodemailer.createTransport({
      // host: process.env.EMAIL_HOST,
      // port: process.env.EMAIL_PORT,
      service: "gmail",
  
      auth: {
        user: process.env.EMAIL_SENDER_ADDRESS,
        pass: process.env.EMAIL_SENDER_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = html.pug.renderFile(`${__dirname}/..views/email/${template}.pug`, {
      username: this.username,
      subject
    });
    
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    await this.new
  } 

  async sendEmailVerification() {
    await this.send("EmailVerify","Welcome to TAF");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Your password reset token valid for only 10 minutes")
  }
};

// const sendEmail = async (options) => {

//   //   console.log("before mailOptions");
//   const mailOptions = {
//     from: "TAF <info@taf.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html:
//   };

//   //   console.log("before sendMail");
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
