const express = require("express");

const router = express.Router({ mergeParams: true });
const CommentController = require("../controller/comment.controller");
const AuthController = require("../controller/auth.controller");
const replyRoute = require("./reply.route");

router
  .route("/")
  .post(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    CommentController.CreateComment,
  );

router.route("/:commentID/reply", replyRoute);

module.exports = router;
