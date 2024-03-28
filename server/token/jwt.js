const jwt = require("jsonwebtoken");

const cookie = require("cookie");

const Config = require("../config/config.js");
const { header, payload } = require("../config/jwtConfig.js");

// Function to generate JWT token asynchronously
class JWT {
  async generateToken() {
    try {
      // Generate JWT token asynchronously
      const token = await new Promise((resolve, reject) => {
        jwt.sign(header, Config.privateKey, payload, (err, token) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(token);
        });
      });

      return token;
    } catch (error) {
      throw new Error("Failed to generate JWT token: " + error.message);
    }
  }

  async generateTokens() {
    try {
      const accessToken = await this.generateToken(
        header,
        Config.privateKey,
        payload,
      );
      const refreshToken = await this.generateToken(
        header,
        Config.privateKey,
        payload,
      );
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error("Failed to generate JWT tokens: " + error.message);
    }
  }

  async generateCookie(req, res, token) {
    try {
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        domain: "y43qh6-3000.csb.app",
        sameSite: "lax",
        maxAge: 60 * 60 * 5,
      };
      // await res.setHeader("Bearer", cookie.serialize(token));

      await res.cookie("token", token, cookieOptions);
    } catch (error) {
      console.error("Failed to generate cookie:", error);
      throw error;
    }
  }

  async verifyToken(req, res, next) {
    // Get the authorization header
    const authHeader = req.header("Cookie");

    // Check if authorization header exists
    if (typeof authHeader !== "undefined") {
      // Split the header into two parts: Bearer and the token
      const tokenParts = authHeader.split("=");
      if (tokenParts.length === 2 && tokenParts[0] === "token") {
        // Extract and verify the token
        const token = tokenParts[1];
        jwt.verify(token, Config.publicKey, (err, decodedToken) => {
          if (err) {
            // Token is not valid
            res.status(401).json({ error: "Invalid token" });
          } else {
            // Token is valid, set the decoded token in the request object
            req.decodedToken = decodedToken;
            next(); // Proceed to the next middleware
          }
        });
      } else {
        // Invalid authorization header format
        res.status(401).json({ error: "Invalid token" });
      }
    } else {
      // Authorization header is missing
      res.status(401).json({ error: "Access denied" });
    }
  }

  async decodeToken(token) {
    try {
      const payload = await new Promise((resolve, reject) => {
        jwt.decode(token, Config.publicKey, (err, payload) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(payload);
        });
      });
      return payload;
    } catch (error) {
      throw new Error("Failed to decode token: " + error.message);
    }
  }
}
module.exports = new JWT();
