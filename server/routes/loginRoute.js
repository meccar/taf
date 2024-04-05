const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");

router.route("/v1/login").post(UserController.login);

module.exports = router;
