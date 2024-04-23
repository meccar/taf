const express = require("express");

const router = express.Router();
const VoteController = require("../controller/vote.controller");
const JWT = require("../token/jwt");

router.route("/").patch(JWT.verifyToken, VoteController.AddVote);

module.exports = router;
