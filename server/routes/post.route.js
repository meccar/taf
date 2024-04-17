const express = require("express");

const router = express.Router();
const PostController = require("../controller/post.controller");
const commentRoute = require("./comment.route");

router
  .route("/")
  .get(PostController.GetAllPost)
  .post(PostController.CreatePost);

router
  .route("/:id")
  .post(PostController.GetPost)
  .patch(PostController.UpdatePost)
  .delete(PostController.DeletePost);

router.route("/:postID/comment", commentRoute);

module.exports = router;
