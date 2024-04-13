/* eslint-disable prettier/prettier */
const express = require("express");

const protected = express.Router();
const JWT = require("../token/jwt");
const authController = require("../controller/auth.controller");

// const { VerifyPaseto, DecryptPayload } = require("../middleware/pasetoAuth");

// Protected route
protected.get(
  "/",
  authController.verifyToken,
  authController.retrictTo(),
  (req, res) => {
    res.status(200).json({ message: "Protected route accessed" });
  },
);

module.exports = protected;
