const express = require("express");

const router = express.Router();
const ContactController = require("../controller/contact.controller");

router
    .route("/")
    .post(ContactController.contactForm);

module.exports = router;
