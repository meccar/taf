const express = require("express");

const router = express.Router();
const CommunityController = require("../controller/community.controller");
const AuthController = require("../controller/auth.controller");
const ImageController = require("../controller/image.controller");
const JWT = require("../token/jwt");
const UserController = require("../controller/user.controller");

router
  .route("/")
  .post(
    JWT.verifyToken,
    UserController.GetMe,
    AuthController.retrictTo("user"),
    CommunityController.CreateCommunity,
  )
  .get(CommunityController.GetAllCommunity);

router
  .route("/:id")
  .get(CommunityController.GetCommunity)
  .patch(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    ImageController.uploadPhoto,
    ImageController.resizePhoto,
    CommunityController.UpdateCommunity,
  )
  .delete(
    JWT.verifyToken,
    AuthController.retrictTo("user"),
    CommunityController.DeleteCommunity,
  );

module.exports = router;
