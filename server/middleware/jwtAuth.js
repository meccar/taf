const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

// Load the public key
const publicKey = fs.readFileSync(path.join(__dirname, "..", "pub.pem"));

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    // Verify the token using the public key and additional options
    jwt.verify(
      token,
      publicKey,
      {
        algorithms: ["RS256"],
        audience: "urn:https://qd4djl-3000.csb.app",
        issuer: "urn:https://qd4djl-3000.csb.app",
      },
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        }

        // Capture the decoded payload
        req.userId = decoded.userId;
        next();
      },
    );
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
