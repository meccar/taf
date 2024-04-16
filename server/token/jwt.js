const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");

const Config = require("../config/config");
const option = require("../config/jwtConfig");
const catchAsync = require("../util/catchAsync");

// Function to generate JWT token asynchronously
exports.generateToken = (id) => jwt.sign({ id }, Config.privateKey, option);

exports.verifyToken = catchAsync(async (req, res, next) => {
  // Get the token from the cookie
  // const { token } = req.cookies;

  if (!req.cookies.token) {
    // Token is missing, throw specific error
    throw new Error("Access denied");
  }

  // Verify the token
  const decodedToken = await jwt.verify(req.cookies.token, Config.privateKey);

  // Token is valid, set decoded data and proceed
  req.decodedToken = decodedToken;
  next();
});

exports.decodedToken = (token) => {
  // Decode the token and return the payload (consider using verification with secret key for better security)
  const decoded = jwt.decode(token);
  return decoded;
};

// class JWT {
//   async generateTokens(user_id) {
//     try {
//       const accessToken = await this.generateToken(user_id);
//       const refreshToken = await this.generateToken(user_id);
//       return { accessToken, refreshToken };
//     } catch (error) {
//       throw new Error(`Failed to generate JWT tokens: ${error.message}`);
//     }
//   }

//   async generateCookie(req, res, token) {
//     try {
//       const cookieOptions = {
//         httpOnly: false,
//         secure: Config.node_env === "production",
//         sameSite: "lax",
//         path: "/",
//         expires: new Date(Date.now() + 99999999999),
//       };

//       // await res.setHeader("Bearer", cookie.serialize(token));

//       await res.cookie("token", token, cookieOptions);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async verifyToken(req, res, next) {
//     try {
//       // Get the token from the cookie
//       const { token } = req.cookies;

//       if (!token) {
//         // Token is missing, throw specific error
//         throw new Error("Access denied");
//       }

//       // Verify the token
//       const decodedToken = await jwt.verify(token, Config.privateKey);

//       // Token is valid, set decoded data and proceed
//       req.decodedToken = decodedToken;
//       next();
//     } catch (error) {
//       return res
//         .status(200)
//         .json({ status: "fail", message: "Failed to verify user" });
//     }
//   }

//   async decodedToken(token) {
//     try {
//       // Decode the token and return the payload (consider using verification with secret key for better security)
//       const decoded = jwt.decode(token);
//       return decoded;
//     } catch (error) {
//       throw new Error("Can't verify user");
//     }
//   }
// }
// module.exports = new JWT();
