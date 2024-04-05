/* eslint-disable prettier/prettier */
const express = require("express");

const protected = express.Router();
const JWT = require("../token/jwt");

// const { VerifyPaseto, DecryptPayload } = require("../middleware/pasetoAuth");

// Protected route
protected.get("/", JWT.verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

module.exports = protected;
