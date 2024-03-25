const Contact = require("../models/contact.models.js");

class ContactController {
  async contactForm(req, res, next) {
    try {
      const { name, email, phone, message } = req.body;

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
  }
}

module.exports = new ContactController();
