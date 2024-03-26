const express = require("express");
const protected = express.Router();
const JWT = require("../token/jwt.js");

const { VerifyPaseto, DecryptPayload } = require("../middleware/pasetoAuth.js");

// Protected route
protected.get("/", JWT.verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

module.exports = protected;
