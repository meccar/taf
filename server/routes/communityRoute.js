const express = require("express");

const router = express.Router();
const CommunityController = require("../controller/community.controller");

router
  .route("/")
  .post(CommunityController.CreateCommunity)
  .get(CommunityController.GetAllCommunity);

module.exports = router;
