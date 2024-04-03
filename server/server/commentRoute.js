const express = require("express");

const router = express.Router();
const CommentController = require("../api/comment.api.js");

router
    .route("/")
    .post( CommentController.comment);

module.exports = router;
