const mongoose = require("mongoose");
const { validateEmail, validatePassword } = require("../util/validator.js");
const { Schema } = mongoose;

class Account {
  constructor() {
    this.schema = new Schema({
      username: {
        type: String,
        required: [true, "Name is required"],
        minlength: [4, "Name must be at least 4 characters long"],
        maxlength: [35, "Name cannot exceed 35 characters"],
        match: [
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores",
        ],
      },
      email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"],
        validate: {
          validator: validateEmail,
          message: "Please enter a valid email",
        },
      },
      is_email_verified: {
        type: Boolean,
        default: false,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        validate: {
          validator: validatePassword,
          message: "Please enter a valid Password",
        },
      },
      message: String,
      timestamp: {
        type: Date,
        default: Date.now, // Set timestamp on creation
      },
    });
  }
}

const account = new Account();
const AccountModel = mongoose.model("accounts", account.schema);
module.exports = AccountModel;
