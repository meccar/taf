const express = require("express");

const router = express.Router();
const RuleController = require("../controller/rule.controller");

router
  .route("/")
  .post(RuleController.CreateRule)
  .get(RuleController.GetAllRule);

router
  .route("/:id")
  .delete(RuleController.DeleteRule)
  .get(RuleController.GetRule)
  .patch(RuleController.UpdateRule);

module.exports = router;
