const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");
const { validateLogin } = require("../middleware/validateLogin");

// router.route("/").post(validateLogin, UserController.login);
router.route("/login").post(UserController.login);
router.route("/register").post(UserController.register);
router.route("/logout").get(UserController.logout);
router.route("/forgotPassword").post(UserController.forgotPassword);
router.route("/resetPassword").post(UserController.resetPassword);

module.exports = router;
