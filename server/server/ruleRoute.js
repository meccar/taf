const express = require("express");

const router = express.Router();
const RuleController = require("../api/rule.api.js");

router
    .route("/")
    .post(RuleController.CreateRule);

module.exports = router;
