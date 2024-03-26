const { V3 } = require("paseto");
const path = require("path");
const fs = require("fs");

const secretkey = fs.readFileSync(path.join(__dirname, "..", "secr.pem"));
const publicKey = fs.readFileSync(path.join(__dirname, "..", "pub.pem"));

async function VerifyPaseto() {
  try {
    await V3.verify(token, publicKey, {
      audience: "urn:y43qh6-3000.csb.app:client",
      issuer: "y43qh6-3000.csb.app",
      clockTolerance: "1 min",
    });
  } catch (error) {
    throw new Error("Failed to decrypt token: " + error.message);
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
