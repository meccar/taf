const express = require("express");

const router = express.Router();
const UserController = require("../controller/user.controller");
const validateRegister = require("../middleware/validateRegister");

// router.route("/").post(validateRegister, UserController.register);
router.route("/").post(UserController.register);
// router.route("/").post(
//   (req, res, next) => validateRegister(req, res, next),
//   (req, res, next) => UserController.register(req, res, next),
// );

module.exports = router;
