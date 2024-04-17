const express = require("express");

const router = express.Router({ mergeParams: true });
const AuthController = require("../controller/auth.controller");
const ReplyController = require("../controller/reply.controller");

router
  .route("/")
  .post(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    ReplyController.CreateReply,
  )
  .get(ReplyController.GetAllReply);

router
  .route("/:id")
  .get(ReplyController.GetReply)
  .patch(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    ReplyController.UpdateReply,
  )
  .delete(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    ReplyController.DeleteReply,
  );
module.exports = router;
