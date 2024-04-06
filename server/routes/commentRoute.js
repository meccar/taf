const express = require("express");

const router = express.Router();
const CommentController = require("../controller/comment.controller");

router.route("/").post(CommentController.comment);

module.exports = router;
