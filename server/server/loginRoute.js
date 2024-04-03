const express = require("express");

const router = express.Router();
const UserController = require("../api/user.api.js");

router
    .route("/v1/login")
    .post(UserController.login);

module.exports = router;
