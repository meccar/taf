const mongoose = require("mongoose");
const {
  validateName,
  validateEmail,
  validatePhone,
} = require("../util/validator.js");
const { Schema } = mongoose;

class Contact {
  constructor() {
    this.schema = new Schema({
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
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
          validator: validatePhone,
          message: "Please enter a valid phone number",
        },
        unique: true,
      },
      message: { type: String },
    });
  }
}

const contact = new Contact();
const ContactModel = mongoose.model("contacts", contact.schema);
module.exports = ContactModel;
