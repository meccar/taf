const express = require("express");

const router = express.Router();
const VerifyMailController = require("../controller/verify_mail.controller");

router
  .route("/v1/verifymail/:email/:secret_code")
  .get(VerifyMailController.verifyMail);

module.exports = router;
