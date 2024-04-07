const express = require("express");

const router = express.Router();
const PostController = require("../controller/post.controller");

router
  .route("/")
  .get(PostController.GetAllPost)
  .post(PostController.CreatePost);

router
  .route("/:id")
  .post(PostController.GetPost)
  .patch(PostController.updatePost)
  .delete(PostController.deletePost);

module.exports = router;
