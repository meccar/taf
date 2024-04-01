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
        minlength: [4, "Name must be at least 4 characters long"],
        maxlength: [35, "Name cannot exceed 35 characters"],
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
      timestamp: {
        type: Date,
        default: Date.now, // Set timestamp on creation
      },
    });
  }
}

const contact = new Contact();
const ContactModel = mongoose.model("contacts", contact.schema);
module.exports = ContactModel;
