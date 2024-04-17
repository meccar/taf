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
  )
  .get(CommentController.GetAllComment);

router
  .route("/:id")
  .get(CommentController.GetComment)
  .patch(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    CommentController.UpdateComment,
  )
  .delete(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    CommentController.DeleteComment,
  );

router.route("/:commentID/reply", replyRoute);

module.exports = router;
