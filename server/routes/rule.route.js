const express = require("express");

const router = express.Router();
const RuleController = require("../controller/rule.controller");
const JWT = require("../token/jwt");

router
  .route("/")
  .post(JWT.verifyToken, RuleController.CreateRule)
  .get(RuleController.GetAllRule);

router.use(JWT.verifyToken);
router
  .route("/:id")
  .delete(RuleController.DeleteRule)
  .get(RuleController.GetRule)
  .patch(RuleController.UpdateRule);

module.exports = router;
