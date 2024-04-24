const express = require("express");

const router = express.Router({ mergeParams: true });
const PostController = require("../controller/post.controller");
const commentRoute = require("./comment.route");
const AuthController = require("../controller/auth.controller");
const ImageController = require("../controller/image.controller");
const JWT = require("../token/jwt");
const UserController = require("../controller/user.controller");

router.use("/:postID/comment", commentRoute);

router
  .route("/")
  .get(PostController.GetAllPost)
  .post(
    JWT.verifyToken,
    UserController.GetMe,
    AuthController.retrictTo("user"),
    PostController.CheckCommunity,
    ImageController.uploadMultiPhotos,
    ImageController.resizeMultiPhotos,
    PostController.CreatePost,
  );

router
  .route("/:id")
  .get(PostController.GetPost)
  .patch(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    ImageController.uploadMultiPhotos,
    ImageController.resizeMultiPhotos,
    PostController.UpdatePost,
  )
  .delete(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    PostController.DeletePost,
  );

module.exports = router;
