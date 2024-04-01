const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");

const Config = require("../config/config.js");
const option = require("../config/jwtConfig.js");

// Function to generate JWT token asynchronously
class JWT {
  async generateToken(user_id) {
    const payload = {
      user_id,
    }
    try {
      return new Promise((resolve, reject) => {
        jwt.sign(payload, Config.privateKey, option, (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        });
      });
    } catch (error) {
      throw new Error("Failed to generate JWT token: " + error.message);
    }
  }

  async generateTokens(user_id) {


    try {
      const accessToken = await this.generateToken(user_id);
      const refreshToken = await this.generateToken(user_id);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error("Failed to generate JWT tokens: " + error.message);
    }
  }

  async generateCookie(req, res, token) {
    try {
      const cookieOptions = {
        httpOnly: false,
        secure: Config.node_env === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 99999999999),
      };

      // await res.setHeader("Bearer", cookie.serialize(token));

      await res.cookie("token", token, cookieOptions);
    } catch (error) {
      console.error("Failed to generate cookie:", error);
      throw error;
    }
  }

  async verifyToken(req, res, next) {
    // Get the token from the cookie
    const token = req.cookies.token;
  
    if (token) {
      jwt.verify(token, Config.privateKey, (err, decodedToken) => {
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
      // Token is missing
      res.status(401).json({ error: "Access denied" });
    }
  }

}
module.exports = new JWT();
