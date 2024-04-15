const mongoose = require("mongoose");

const VerifyMailSchema = new mongoose.Schema({
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

const VerifyMail = mongoose.model("verify_mails", VerifyMailSchema);
module.exports = VerifyMail;
