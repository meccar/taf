const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");

router.route("/").post(UserController.register);

module.exports = router;
