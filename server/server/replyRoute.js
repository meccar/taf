const express = require("express");

const router = express.Router();
const ReplyController = require("../api/reply.api.js");

router
    .route("/")
    .post(ReplyController.reply);

module.exports = router;
