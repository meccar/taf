const express = require("express");
const router = express.Router();
const contactForm = require("../api/contact.api.js");

router.get("/", (req, res) => {
  // Send environment variables as an object
  res.send("Hello World!");
});

// Define routes
router.post("/v1/contact", contactForm.submitForm);

module.exports = router;
