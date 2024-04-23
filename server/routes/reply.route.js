const express = require("express");

const router = express.Router({ mergeParams: true });
const AuthController = require("../controller/auth.controller");
const ReplyController = require("../controller/reply.controller");
const JWT = require("../token/jwt");

router
  .route("/")
  .post(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    ReplyController.CreateReply,
  )
  .get(ReplyController.GetAllReply);

router
  .route("/:id")
  .get(ReplyController.GetReply)
  .patch(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    ReplyController.UpdateReply,
  )
  .delete(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    ReplyController.DeleteReply,
  );

module.exports = router;
