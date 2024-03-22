const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: Number },
  message: { type: String },
});

const Contact = mongoose.model("contacts", ContactSchema);
module.exports = Contact;
