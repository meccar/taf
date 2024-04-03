const express = require("express");

const router = express.Router();
const UserController = require("../api/user.api.js");

router
    .route("/v1/logout")
    .get(UserController.logout);

module.exports = router;
