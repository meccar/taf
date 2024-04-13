const express = require("express");

const router = express.Router();
const RuleController = require("../controller/rule.controller");

router.route("/").post(RuleController.CreateRule);

module.exports = router;
