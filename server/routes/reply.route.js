const express = require("express");

const router = express.Router({ mergeParams: true });
const AuthController = require("../controller/auth.controller");
const ReplyController = require("../controller/reply.controller");

router
  .route("/")
  .post(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    ReplyController.reply,
  );

router.route("/:replyID").get(ReplyController.reply);
module.exports = router;
