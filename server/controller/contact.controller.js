/* eslint-disable node/no-unsupported-features/es-builtins */
const Contact = require("../models/contact.models");

class ContactController {
  async contactForm(req, res, next) {
    try {
      const { name, email, phone, message } = req.body;

      // Create and save the new contact concurrently
      const [createResult, saveResult] = await Promise.allSettled([
        new Promise((resolve) => {
          resolve(new Contact({ name, email, phone, message }));
        }),
        new Promise((resolve, reject) => {
          const newContact = new Contact({ name, email, phone, message });
          newContact.save().then(resolve).catch(reject);
        }),
      ]);

      if (
        createResult.status === "rejected" ||
        saveResult.status === "rejected"
      ) {
        const error = createResult.reason || saveResult.reason;
        console.error(error);
        return res.status(500).json({ message: error.message });
      }

      return res.status(201).json({
        status: "sucesss",
        message: "Contact form submitted successfully",
        data: saveResult.value,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ContactController();
