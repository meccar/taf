/* eslint-disable node/no-extraneous-require */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");
const { validateEmail, validatePhone } = require("../util/validator");

const { Schema } = mongoose;

class Contact {
  constructor() {
    this.schema = new Schema({
      name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minlength: [4, "Name must be at least 4 characters long"],
        maxlength: [35, "Name cannot exceed 35 characters"],
      },
      email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        validate: {
          validator: validateEmail,
          message: "Please enter a valid email",
        },
        unique: [true, "The email is already registered"],
      },
      phone: {
        type: String,
        trim: true,
        required: [true, "Phone number is required"],
        validate: {
          validator: validatePhone,
          message: "Please enter a valid phone number",
        },
        unique: [true, "The phone number is already registered"],
      },
      message: { type: String },
      timestamp: {
        type: Date,
        default: Date.now, // Set timestamp on creation
      },
    });
    this.schema.plugin(uniqueValidator, {
      message: "The {PATH} '{VALUE}' is already registered",
    });
  }
}

const contact = new Contact();
const ContactModel = mongoose.model("contacts", contact.schema);
module.exports = ContactModel;
