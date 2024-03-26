const express = require("express");
const protected = express.Router();
const verifyToken = require("../middleware/jwtAuth.js");
const { VerifyPaseto, DecryptPayload } = require("../middleware/pasetoAuth.js");

// Protected route
protected.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

module.exports = protected;
