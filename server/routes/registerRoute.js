const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");
const validateRegister = require("../middleware/validateRegister");

router.route("/").post(validateRegister, UserController.register);

module.exports = router;
