const express = require("express");

const router = express.Router();
const UserController = require("../api/user.api.js");

router
    .route("/")
    .post( UserController.register);

module.exports = router;
