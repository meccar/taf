var jwt = require("jsonwebtoken");
// var privateKey = fs.readFileSync("private.key");
var privateKey = "your-secret-key";
var token = jwt.sign(
  { foo: "bar" },
  privateKey,
  { algorithm: "RS256", expiresIn: "1h" },
  function (err, token) {
    console.log(token);
  },
);

module.exports = token;
