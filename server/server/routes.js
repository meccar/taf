const express = require("express");
const router = express.Router();
const apiContact = require("../api/contact.api.js");
const apiRegister = require("../api/register.api.js");
const apiLogin = require("../api/login.api.js");

router.get("/", (req, res) => {
  // Send environment variables as an object
  res.send("Hello World!");
});

// Define routes
router.post("/v1/contact", apiContact.contactForm);
router.post("/v1/register", apiRegister.registerForm);
router.post("/v1/login", apiLogin.loginForm);

module.exports = router;
