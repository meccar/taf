const { V3 } = require("paseto");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// const secret = fs.readFileSync(path.join(__dirname, "..", "secret_key.pem"));

const secretkey = crypto.randomBytes(32);
const privateKey = fs.readFileSync(
  path.join(__dirname, "..", "private_key.pem"),
);

const payload = {
  "urn:example:claim": "foo",
};

async function GeneratePaseto() {
  try {
    const token = await V3.sign(payload, privateKey, {
      audience: "urn:y43qh6-3000.csb.app:client",
      issuer: "y43qh6-3000.csb.app",
      expiresIn: "2 hours",
    });
    return token;
  } catch (error) {
    throw new Error("Failed to generate Paseto token: " + error.message);
  }
}

async function EncryptPayload() {
  try {
    const token = await V3.encrypt(payload, secretkey, {
      audience: "urn:y43qh6-3000.csb.app:client",
      issuer: "y43qh6-3000.csb.app",
      expiresIn: "2 hours",
    });
    return token;
  } catch (error) {
    throw new Error("Failed to encrypt payload: " + error.message);
  }
}

module.exports = { GeneratePaseto, EncryptPayload };
