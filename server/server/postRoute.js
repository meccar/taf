const express = require("express");

const router = express.Router();
const PostController = require("../api/post.api.js");

router
    .route("/")
    .get(PostController.GetAllPost)
    .post(PostController.CreatePost);

router
    .route("/:id")
    .post(PostController.GetPost);   

module.exports = router;