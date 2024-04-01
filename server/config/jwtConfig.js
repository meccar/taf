const Config = require("./config.js");

const header = {
  alg: "RS256", // Example algorithm (use the one you need)
  typ: "JWT", // Example token type
};

const option = {
  algorithm: "RS256", // Algorithm used for signing
  expiresIn: 60 * 60 * 5, // Expiration time in seconds
  header,
};

module.exports = option;
