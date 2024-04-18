const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");
const AuthController = require("../controller/auth.controller");
const ImageController = require("../controller/image.controller");

// router.route("/").post(validateLogin, UserController.login);
router.post("/login", AuthController.login);

router
  .route("/register")
  .post(
    ImageController.uploadPhoto,
    ImageController.resizePhoto,
    UserController.register,
  );

router.get("/logout", UserController.logout);

router.post("/forgotPassword", AuthController.forgotPassword);

router.patch("/resetPassword/:token", AuthController.resetPassword);

router.use(AuthController.verifyToken);

router.patch("/updatePassword", AuthController.updatePassword);
router.get("/me", UserController.GetMe, UserController.getUser);
router.delete(
  "/deleteMe",
  ImageController.uploadPhoto,
  ImageController.resizePhoto,
  UserController.DeleteMe,
);
router.patch(
  "/updateMe",
  ImageController.uploadPhoto,
  ImageController.resizePhoto,
  UserController.UpdateMe,
);

router
  .route("/")
  .get(UserController.GetAllAccount)
  .post(UserController.CreateAccount);

router
  .route("/:id")
  .get(UserController.GetAccount)
  .patch(UserController.UpdateAccount)
  .delete(UserController.DeleteAccount);

module.exports = router;
