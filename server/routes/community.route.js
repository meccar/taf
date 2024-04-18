const express = require("express");

const router = express.Router();
const CommunityController = require("../controller/community.controller");
const AuthController = require("../controller/auth.controller");
const ImageController = require("../controller/image.controller");

router
  .route("/")
  .post(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    ImageController.uploadPhoto,
    ImageController.resizePhoto,
    CommunityController.CreateCommunity,
  )
  .get(CommunityController.GetAllCommunity);

router
  .route("/:id")
  .get(CommunityController.GetCommunity)
  .patch(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    ImageController.uploadPhoto,
    ImageController.resizePhoto,
    CommunityController.UpdateCommunity,
  )
  .delete(
    AuthController.verifyToken,
    AuthController.retrictTo("user"),
    CommunityController.DeleteCommunity,
  );

module.exports = router;
