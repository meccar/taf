const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");

router.route("/v1/logout").get(UserController.logout);

module.exports = router;
