const express = require("express");

const router = express.Router();
const ReplyController = require("../controller/reply.controller");

router.route("/").post(ReplyController.reply);

module.exports = router;
