const Config = require("./config.js");

const header = {
  alg: "RS256", // Example algorithm (use the one you need)
  typ: "JWT", // Example token type
};

const payload = {
  algorithm: "RS256", // Algorithm used for signing
  expiresIn: 60 * 60 * 5, // Expiration time in seconds
  issuer: "y43qh6-3000.csb.app", // Issuer of the token
  audience: "y43qh6-3000.csb.app", // Audience of the token
};

module.exports = { header, payload };
