const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");
const { validateLogin } = require("../middleware/validateLogin");

// router.route("/").post(validateLogin, UserController.login);
router.route("/").post(UserController.login);

module.exports = router;
