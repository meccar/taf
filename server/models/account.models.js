const mongoose = require("mongoose");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../util/validator.js");

class Account {
  constructor() {
    this.schema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Name is required"],
        validate: {
          validator: validateName,
          message: "Name must be between 3 and 35 characters",
        },
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
          validator: validateEmail,
          message: "Please enter a valid email",
        },
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
          validator: validatePassword,
          message: "Please enter a valid Password",
        },
      },
      message: { type: String },
    });
  }
}

const account = new Account();
const AccountModel = mongoose.model("accounts", account.schema);
module.exports = AccountModel;
