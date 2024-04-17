const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");
const AuthController = require("../controller/auth.controller");
const { validateLogin } = require("../middleware/validateLogin");

// router.route("/").post(validateLogin, UserController.login);
router.route("/login").post(AuthController.login);

router.route("/register").post(UserController.register);

router.route("/logout").get(UserController.logout);

router.route("/forgotPassword").post(AuthController.forgotPassword);

router.route("/resetPassword/:token").patch(AuthController.resetPassword);

router
  .route("/updatePassword")
  .patch(AuthController.verifyToken, AuthController.updatePassword);

router
  .route("/updateAccount")
  .patch(AuthController.verifyToken, UserController.updateAccount);

router
  .route("/deleteAccount")
  .delete(AuthController.verifyToken, UserController.DeleteAccount);

module.exports = router;
