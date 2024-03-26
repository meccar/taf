const { V3 } = require("paseto");

const Config = require("../config/config.js");

const secretkey = Config.secretkey;
const publicKey = Config.publicKey;

async function VerifyPaseto(req, res, next) {
  const token = req.header("Cookie").replace("token=", "");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    await V3.verify(
      token,
      publicKey,
      {
        audience: "urn:y43qh6-3000.csb.app:client",
        issuer: "y43qh6-3000.csb.app",
        clockTolerance: "1 min",
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
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

async function DecryptPayload() {
  try {
    await V3.decrypt(token, secretkey, {
      audience: "urn:y43qh6-3000.csb.app:client",
      issuer: "y43qh6-3000.csb.app",
      clockTolerance: "1 min",
    });
  } catch (error) {
    throw new Error("Failed to decrypt token: " + error.message);
  }
}

module.exports = { VerifyPaseto, DecryptPayload };
