const express = require("express");

const router = express.Router();
const VerifyMailController = require("../api/verify_mail.api.js");

router
    .route("/v1/verifymail/:email/:secret_code")
    .get(VerifyMailController.verifyMail);

module.exports = router;
