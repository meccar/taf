const express = require("express");

const router = express.Router();
const ContactController = require("../api/contact.api.js");

router
    .route("/")
    .post(ContactController.contactForm);

module.exports = router;
