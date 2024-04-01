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
      throw error;
    }
  }

  async verifyToken(req, res, next) {
    try {
      // Get the token from the cookie
      const token = req.cookies.token;
  
      if (!token) {
        // Token is missing, throw specific error
        throw new Error("Access denied");
      }
  
      // Verify the token
      const decodedToken = await jwt.verify(token, Config.privateKey);
  
      // Token is valid, set decoded data and proceed
      req.decodedToken = decodedToken;
      next();
    } catch (error) {
      throw new Error("Can't verify user");
    }
  }

  async decodedToken(token) {
    try {
      // Decode the token and return the payload (consider using verification with secret key for better security)
      const decoded = jwt.decode(token);
      return decoded;
    } catch (error) {
      throw new Error("Can't verify user");
    }
  }

}
module.exports = new JWT();
