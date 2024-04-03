const express = require("express");

const router = express.Router();
const CommunityController = require("../api/community.api.js");

router
    .route("/")
    .post(CommunityController.CreateCommunity);

module.exports = router;
