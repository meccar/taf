/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */

const mongoose = require("mongoose");

const { Schema } = mongoose;

class VerifyMail {
  constructor() {
    this.schema = new Schema({
      email: {
        type: String,
        trim: true,
      },
      secret_code: {
        type: String,
      },
      is_used: {
        type: Boolean,
        default: false,
      },
      expires_at: {
        type: Date,
        default: function () {
          return new Date(Date.now() + 15 * 60 * 1000);
        },
      },
      timestamp: {
        type: Date,
        default: Date.now, // Set timestamp on creation
      },
    });
  }
}

const verify_mail = new VerifyMail();
const Verify_mailModel = mongoose.model("verify_mails", verify_mail.schema);
module.exports = Verify_mailModel;
