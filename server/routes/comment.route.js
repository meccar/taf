const express = require("express");

const router = express.Router({ mergeParams: true });
const CommentController = require("../controller/comment.controller");
const AuthController = require("../controller/auth.controller");
const UserController = require("../controller/user.controller");
const replyRoute = require("./reply.route");
const JWT = require("../token/jwt");

router.use("/:commentID/reply", replyRoute);

router
  .route("/")
  .post(
    JWT.verifyToken,
    UserController.GetMe,
    AuthController.retrictTo("user"),
    CommentController.CreateComment,
  )
  .get(CommentController.GetAllComment);

router
  .route("/:id")
  .get(CommentController.GetComment)
  .patch(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    CommentController.UpdateComment,
  )
  .delete(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    CommentController.DeleteComment,
  );

module.exports = router;
