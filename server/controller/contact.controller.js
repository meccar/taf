const Contact = require("../models/contact.models");

class ContactController {
  async contactForm(req, res, next) {
    try {
      const { name, email, phone, message } = req.body;

      const newContact = await Contact.create({ name, email, phone, message });

      return res.status(201).json({
        status: "success",
        message: "Contact form submitted successfully",
        data: { newContact },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ContactController();
