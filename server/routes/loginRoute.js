const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");
const validateLogin = require("../middleware/validateLogin");

router.route("/v1/login").post(validateLogin, UserController.login);

module.exports = router;
