/* eslint-disable node/no-extraneous-require */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require("mongoose");
const validator = require("validator");

const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const ContactSchema = new Schema({
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
      validator: [validator.isEmail, "Please enter a valid email"],
    },
    unique: [true, "The email is already registered"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone number is required"],
    validate: {
      validator: [
        validator.isMobilePhone("vi-VN"),
        "Please enter a valid phone number",
      ],
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

const Contact = mongoose.model("contacts", ContactSchema);
module.exports = Contact;
