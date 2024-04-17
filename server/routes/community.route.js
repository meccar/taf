const express = require("express");

const router = express.Router();
const CommunityController = require("../controller/community.controller");
const AuthController = require("../controller/auth.controller");

router
  .route("/")
  .post(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    CommunityController.CreateCommunity,
  )
  .get(CommunityController.GetAllCommunity);

router
  .route("/:id")
  .get(CommunityController.GetCommunity)
  .patch(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    CommunityController.UpdateCommunity,
  )
  .delete(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    CommunityController.DeleteCommunity,
  );

module.exports = router;
