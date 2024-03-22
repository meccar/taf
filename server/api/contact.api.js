const Contact = require("../models/contact.models.js");
const validator = require("validator");

exports.contactForm = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    // console.log("name:", name);
    // console.log("email:", email);
    // console.log("phone:", phone);
    // console.log("message:", message);
    // console.log("req.body:", req.body); // Log req.body separately

    // Basic validations
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, email, and phone are required fields" });
    }

    // if (!validator.isLength(name, { min: 3, max: 35 })) {
    //   return res.status(400).json({ message: "Please enter valid name" });
    // }

    // if (!validator.isEmail(email)) {
    //   return res.status(400).json({ message: "Please enter valid email" });
    // }

    // if (!validator.isMobilePhone(String(phone), "vi-VN")) {
    //   return res
    //     .status(400)
    //     .json({ message: "Please enter valid phone number" });
    // }

    // Create a new contact instance
    const newContact = new Contact({
      name: name,
      email: email,
      phone: phone,
      message: message,
    });

    // Save the contact to the database
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
