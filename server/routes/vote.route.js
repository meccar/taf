const express = require("express");

const router = express.Router();
const VoteController = require("../controller/vote.controller");

router.route("/").post(VoteController.AddVote);
// router.route("/down").post(VoteController.AddDownvote);

module.exports = router;
