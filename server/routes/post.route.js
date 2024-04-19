const express = require("express");

const router = express.Router();
const PostController = require("../controller/post.controller");
const commentRoute = require("./comment.route");
const AuthController = require("../controller/auth.controller");
const ImageController = require("../controller/image.controller");

router
  .route("/")
  .get(PostController.GetAllPost)
  .post(
    AuthController.verifyToken,
    PostController.CheckCommunity,
    ImageController.uploadMultiPhotos,
    ImageController.resizeMultiPhotos,
    PostController.CreatePost,
  );

router
  .route("/:id")
  .get(PostController.GetPost)
  .patch(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    ImageController.uploadMultiPhotos,
    ImageController.resizeMultiPhotos,
    PostController.UpdatePost,
  )
  .delete(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    PostController.DeletePost,
  );

router.route("/:postID/comment", commentRoute);

module.exports = router;
