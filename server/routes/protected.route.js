/* eslint-disable prettier/prettier */
const express = require("express");

const protected = express.Router();
const AuthController = require("../controller/auth.controller");
const JWT = require("../token/jwt");

// Protected route
protected.get(
  "/",
  JWT.verifyToken,
  AuthController.retrictTo("user"),
  (req, res) => {
    res.status(200).json({ message: "Protected route accessed" });
  },
);

module.exports = protected;
